import axios, { AxiosError, AxiosInstance } from "axios";
import { AppError } from "@/src/utils/AppError";
import { AuthTokenService } from "./AuthTokenService";

type SignOut = () => void;

type PromiseType = {
    onSucess: (token: string) => void;
    onFailure: (error: AxiosError) => void;
}

type APIInstanceProps = AxiosInstance & {
    registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
    baseURL: 'http://192.168.0.7:3333'
}) as APIInstanceProps;

let failedQueue: Array<PromiseType> = [];
let isRefreshing = false

const interceptorsResponse = (signOut: SignOut) =>
    api.interceptors.response.use(response => response, async (requestError) => {
        const response = requestError?.response


        if (response?.status == 401) {

            {/* Token invalido */ }
            const messagensErrosInvalids = ['token.expired', 'token.invalid']
            const message = response?.data?.message

            if (messagensErrosInvalids.includes(message)) {

                const { refresh_token } = await AuthTokenService.get()
              
                if (!refresh_token) {
                    signOut()
                    return Promise.reject(requestError)
                }

                {/* Fila de requisições  */ }
                const originalRequestConfig = requestError.config

                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({
                            onSucess: (token: string) => {
                                originalRequestConfig.headers = { 'Authorization': `Bearer ${token}` }
                                resolve(api(originalRequestConfig))
                            },
                            onFailure: (error: AxiosError) => {
                                reject(error)
                            }
                        })
                    })
                }

                isRefreshing = true

                {/* Buscar novo token */ }
                return new Promise(async (resolve, reject) => {
                    try {
                        const { data } = await api.post('/sessions/refresh-token', { refresh_token });
                        await AuthTokenService.save(data);

                        if (originalRequestConfig.data) {
                            originalRequestConfig.data = JSON.parse(originalRequestConfig.data)
                        }

                        originalRequestConfig.headers = { 'Authorization': `Bearer ${data.token}` }
                        AuthTokenService.update(data.token)

                        failedQueue.forEach(request => {
                            request.onSucess(data.token)
                        });

                        console.log("TOKEN ATUALIZADO!");

                        resolve(api(originalRequestConfig));

                    } catch (error: any) {
                        failedQueue.forEach(request => {
                            request.onFailure(error)
                        });
                        signOut();
                        reject(error);

                    } finally {
                        isRefreshing = false;
                        failedQueue = [];
                    }
                })


            }

            signOut()
        }

        if (requestError.response && requestError.response.data) {
            return Promise.reject(new AppError(requestError.response.data.message))
        } else {
            return Promise.reject(requestError)
        }
    })

api.registerInterceptTokenManager = signOut => {

    const interceptTokenManager = interceptorsResponse(signOut)
    return () => {
        api.interceptors.response.eject(interceptTokenManager)
    }
}

export { api }