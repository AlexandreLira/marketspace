import { ReactNode, createContext, useEffect, useState } from 'react';
import { UserDTO } from '../dtos/UserDTO';
import { UserService } from '../services/UserService';
import { UserStorageService } from '../services/UserStorageService';

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
            UserStorageService.save(response)
            setUser(response);

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

        } catch {

        } finally {
            setIsLoadUser(false)
        }
    }

    async function loadUser() {
        try {
            setIsLoadUser(true)
            const userLogged = await UserStorageService.get()

            if (userLogged) {
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