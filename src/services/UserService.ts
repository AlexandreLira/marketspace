import { UserDTO } from "../dtos/UserDTO"
import { api } from "./api"

export class UserService {

    static async login(email: string, password: string): Promise<UserDTO> {
        try {
            const payload = { email, password }
            const response = await api.post('sessions', payload)
            return response.data.user
        } catch (error) {
            throw error
        }
    }

}