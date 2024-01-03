import { createContext, ReactNode, useState } from "react";
import { LoginData } from '../../@types/LoginData';
import { api } from '../../services/api';
import { useNavigate } from "react-router-dom";
import { NOTIFICATION_TYPE, Store } from 'react-notifications-component';
import { CreateData } from "@/@types/CreateData";

interface AuthContextType {
    Login: (data: LoginData) => void;
    isLoading: boolean;
    setLoading: (value: boolean) => void;
    Verify: () => void;
    isGlobalLoading: boolean;
    Logout : () => void;
    selected: string;
    setSelected: (value: string) => void;
    createUser: (data: CreateData) => Promise<any>;
}

type ProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export const Logout = () => {
    localStorage.removeItem('nsg_token');
    window.location.href = '/';
}

export const RemoveNotification = () => {
    Store.removeAllNotifications();
    sendAlert("Conexão retomada", "A sua conexão foi retormada, pode ocorrer algum atraso mas logo será normalizado.", "success", 5000)
}

export const sendAlert = (title: string, message: string, type: NOTIFICATION_TYPE, duration: number) => {
    Store.addNotification({
        title,
        message,
        type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration,
          onScreen: true
        }
    });

}

export const AuthProvider = ({children}: ProviderProps) => {
    const navigate = useNavigate();
    
    const [isLoading, setLoading] = useState(false);
    const [isGlobalLoading, setGlobalLoading] = useState(true);
    const [selected, setSelected] = useState("char");

    const Login = async (data: LoginData) => {
        if(isLoading) return;
        setLoading(true);

        api.post('/auth/login', {
            user: data.user,
            password: data.password
        }).then((response) => {
            localStorage.setItem('nsg_token', response.data.data.token);
            setLoading(false);
            Store.removeAllNotifications();
            navigate('/dashboard')
        }).catch((error) => {
            setLoading(false);
            if(!error.response) return sendAlert("Problemas na autenticação", "Parece que houve um problema na autenticação, tente novamente mais tarde.", "danger", 15000)
            sendAlert("Problemas na autenticação", error.response.data.message, "danger", 15000)
        })
    };

    const Verify = async () => {
        let token = localStorage.getItem('nsg_token');
        if(!token) return setGlobalLoading(false);

        api.post('/auth/verify').then(() => {
            navigate('/dashboard')
        }).catch((error) => {
            if(!error.response) return sendAlert("Problemas na verificação", "Parece que houve um problema na verificação, tente novamente mais tarde.", "danger", 15000)
        }).finally(() => {
            setGlobalLoading(false);
        });
    }

    const createUser = async (data: CreateData) => {
        return new Promise((resolve, reject) => {
            if(isLoading) return;
            setLoading(true);
    
            api.post('/account/', {
                username: data.username,
                email: data.email
            }).then((response) => {
                Store.removeAllNotifications();
                sendAlert("Usuário criado", "O utilizador " + data.username + " foi criado com sucesso.", "success", 5000);
                resolve(response);
            }
            ).catch((error) => {
                if(!error.response) return sendAlert("Problemas na criação", "Parece que houve um problema na criação, tente novamente mais tarde.", "danger", 15000)
                sendAlert("Problemas na criação", error.response.data.message, "danger", 15000)
                reject(error);
            })
            .finally(() => {
                setLoading(false);
            }
            );
        })
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
            createUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}