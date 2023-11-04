import { createContext, ReactNode, useState } from "react";
import { LoginData } from '../../@types/LoginData';
import { api } from '../../services/api';
import { useNavigate } from "react-router-dom";
import { Store } from 'react-notifications-component';

interface AuthContextType {
    Login: (data: LoginData) => void;
    isLoading: boolean;
    setLoading: (value: boolean) => void;
    Verify: () => void;
    isGlobalLoading: boolean;
    Logout : () => void;
    selected: string;
    setSelected: (value: string) => void;
}

type ProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export const Logout = () => {
    localStorage.removeItem('nsg_token');
    window.location.href = '/';
}

function LoginError() {
    Store.addNotification({
        title: "Problemas na autenticação",
        message: "Parece que houve um problema na autenticação, tente novamente mais tarde.",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 15000,
          onScreen: true
        }
    });
}

function VerifyError() {
    Store.addNotification({
        title: "Problemas na verificação",
        message: "Parece que houve um problema na verificação, tente novamente mais tarde.",
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 15000,
          onScreen: true
        }
    });
}

export const AuthProvider = ({children}: ProviderProps) => {
    const navigate = useNavigate();
    
    const [isLoading, setLoading] = useState(false);
    const [isGlobalLoading, setGlobalLoading] = useState(true);
    const [selected, setSelected] = useState("home");

    const Login = async (data: LoginData) => {
        if(isLoading) return;
        setLoading(true);

        api.post('/auth/login', {
            user: data.user,
            password: data.password
        }).then((response) => {
            localStorage.setItem('nsg_token', response.data.data.token);
            setLoading(false);
            navigate('/dashboard')
        }).catch((error) => {
            setLoading(false);
            if(!error.response) return LoginError();
        })
    }

    const Verify = async () => {
        let token = localStorage.getItem('nsg_token');
        if(!token) return setGlobalLoading(false);

        api.post('/auth/verify').then(() => {
            navigate('/dashboard')
        }).catch((error) => {
            if(!error.response) return VerifyError();
        }).finally(() => {
            setGlobalLoading(false);
        });
    }

    return (
        <AuthContext.Provider value={{
            Login,
            isLoading,
            setLoading,
            Verify,
            isGlobalLoading,
            Logout,
            selected,
            setSelected,
        }}>
            {children}
        </AuthContext.Provider>
    )
}