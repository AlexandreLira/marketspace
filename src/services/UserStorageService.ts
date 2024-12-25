import { USER_STORAGE } from "../constants/Storage";
import { UserDTO } from "../dtos/UserDTO"
import AsyncStorage from "@react-native-async-storage/async-storage";

export class UserStorageService {

    static async save(user: UserDTO) {
        try {
            const payload = JSON.stringify(user)
            await AsyncStorage.setItem(USER_STORAGE, payload)
        } catch (error) {
            throw error
        }
    }

    static async get(): Promise<UserDTO | null> {
        const response = await AsyncStorage.getItem(USER_STORAGE)
        if (!response) return null
        const user = JSON.parse(response!)

        return user
    }

}