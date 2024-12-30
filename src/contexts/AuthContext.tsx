import { ReactNode, createContext, useEffect, useState } from 'react';
import { UserDTO } from '../dtos/UserDTO';
import { UserService } from '../services/UserService';
import { UserStorageService } from '../services/UserStorageService';
import { AuthTokenService } from '../services/AuthTokenService';
import { api } from '../services/api';

export type AuthCOntextDataProps = {
    user: UserDTO;
    signIn: (email: string, password: string) => Promise<void>;
    logout: () => {};
    isLoadUser: boolean
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext<AuthCOntextDataProps>({} as AuthCOntextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {

    const [user, setUser] = useState({} as UserDTO);
    const [isLoadUser, setIsLoadUser] = useState(false);

    async function signIn(email: string, password: string) {
        try {
            const response = await UserService.login(email, password);
            const { refresh_token, token, user } = response

            if (refresh_token && token && user) {
                await Promise.all([
                    UserStorageService.save(user),
                    AuthTokenService.save({ refresh_token, token })
                ])

                setUser(user);
            }

        } catch (error) {
            console.log(error)
            throw error;
        }

    }

    async function logout() {
        try {
            setIsLoadUser(true)
            setUser({} as UserDTO)
            await UserStorageService.remove()
            await AuthTokenService.remove()

        } catch {

        } finally {
            setIsLoadUser(false)
        }
    }

    async function loadUser() {
        try {
            setIsLoadUser(true)

            const [userLogged, token] = await Promise.all([
                UserStorageService.get(),
                AuthTokenService.get()
            ])

            if (userLogged && token) {
                setUser(userLogged)
            }
        } catch (error) {
            throw error
        } finally {
            setIsLoadUser(false)
        }
    }

    useEffect(() => {
        loadUser()
    }, [])


    useEffect(() => {
        const subscribe = api.registerInterceptTokenManager(logout);

        return () => {
            subscribe()
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                logout,
                signIn,
                isLoadUser
            }}>
            {children}
        </AuthContext.Provider>
    )
}