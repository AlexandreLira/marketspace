import { ReactNode, createContext, useState } from 'react';
import { UserDTO } from '../dtos/UserDTO';

export type AuthCOntextDataProps = {
    user: UserDTO
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext<AuthCOntextDataProps>({} as AuthCOntextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {

    const [user, setUser] = useState({
        id: '1',
        name: 'Alexandre',
        email: 'alexandre@gmail.com',
        avatar: 'alexandre.png'
    });

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}