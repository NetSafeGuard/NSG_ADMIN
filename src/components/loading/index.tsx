import * as C from './style';
import {HashLoader} from 'react-spinners';
import { useEffect } from 'react';
import {sendAlert, RemoveNotification } from '../../global/contexts/AuthContext';

interface LoadingProps {
    text?: string;
};

export const Loading = ({text} : LoadingProps) => {
    useEffect(() => {
        if(text) {
            sendAlert("Problemas de conexão", "Parece que houve um problema na conexão, tente novamente mais tarde.", "danger", 150000)

            return () => {
                RemoveNotification();
            }
        }

    }, [text]);


    return (
        <C.GlobalLoading>
            <HashLoader color='#48B1A5' size={100} />
        </C.GlobalLoading>
    )
};