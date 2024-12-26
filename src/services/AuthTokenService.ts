import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "../constants/Storage";
import { api } from "./api";

interface ISaveProps {
    token: string;
    refresh_token: string;
}



export class AuthTokenService {
    static async save(data: ISaveProps) {

        const storage = JSON.stringify(data)
        await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, storage)
        this.update(data.token)
    }

    static async get(): Promise<ISaveProps | any> {
        const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)
        if (response) {
            const data = JSON.parse(response)
            return data
        }
        return {}
    }

    static async remove() {
        await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
    }

    static async update(token: string) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
}