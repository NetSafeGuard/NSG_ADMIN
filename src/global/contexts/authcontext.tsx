import { createContext, ReactNode, useState } from "react";
import { LoginData } from '../../@types/LoginData';
import { api } from '../../services/api';


type AuthContextType = {
    Login: (data: LoginData) => void;
    isLoading: boolean;
    setLoading: (value: boolean) => void;
    error: string;
    Verify: () => void;
    isGlobalLoading: boolean;
    setGlobalLoading: (value: boolean) => void;
}

type ProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);


export const AuthProvider = ({children}: ProviderProps) => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isGlobalLoading, setGlobalLoading] = useState(true);

    const Login = async (data: LoginData) => {
        if(isLoading) return;
        setLoading(true);

        api.post('/auth/login', {
            email: data.email,
            password: data.password
        }).then((response) => {
            localStorage.setItem('@nsg_token', response.data.token);
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            if(!error.response) return setError('Erro de conexão com o servidor');
            setError(error.response.data.message);
        })
    }

    const Verify = async () => {
        let token = localStorage.getItem('@nsg_token');
        console.log(token)
        if(!token) return setGlobalLoading(false);

        api.get('/auth/verify').then((response) => {
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            if(!error.response) return setError('Erro de conexão com o servidor');
            setError(error.response.data.message);
        })
    }

    return (
        <AuthContext.Provider value={{
            Login,
            isLoading,
            setLoading,
            error,
            Verify,
            isGlobalLoading,
            setGlobalLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}