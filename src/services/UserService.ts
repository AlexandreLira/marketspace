import { UserDTO } from "../dtos/UserDTO"
import { PhotoFile } from "../screens/SignUp";
import { api } from "./api"

interface ISignUp {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
    tel: string;
    photoFile: PhotoFile
}
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

    static async signUp(data: ISignUp) {
        try {
            const { email, name, password, tel, photoFile } = data
            const formData = new FormData();
            formData.append('avatar', photoFile)
            formData.append('name', name)
            formData.append('tel', tel)
            formData.append('email', email)
            formData.append('password', password)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            await api.post('/users', formData, config)
        } catch (error) {
            throw error
        }
    }



}