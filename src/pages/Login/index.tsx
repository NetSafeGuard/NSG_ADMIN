import * as C from './style';
import { RiLoginCircleLine } from 'react-icons/ri';
// import { useContext, useEffect } from 'react';
// import { Spinner } from '../../components/spinner';
// import { LoginSchema } from '../../schemas/LoginSchema';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { Error } from '../../components/error';
// import { LoginData } from '../../@types/LoginData';
// import { AuthContext } from '../../global/contexts/AuthContext';
// import { Loading } from '../../components/loading';

export const LoginPage = () => {

    // const { Login, isLoading, error, Verify, isGlobalLoading } = useContext(AuthContext);

    // useEffect(() => {
    //     Verify();
    // }, [])

    // const {register,handleSubmit,watch,formState: { errors}} = useForm<LoginData>({
    //     resolver: yupResolver(LoginSchema),
    // });
    
    // if(isGlobalLoading) return (
    //     <Loading/>
    // )
    
    return (
        <C.LoginContainer>
            <C.FormContainer>
                <C.FormHeader>
                    <C.SignInIcon>
                        <RiLoginCircleLine color={"#788BA5"} size={30} />
                    </C.SignInIcon>
                    <C.FormTitle>Bem vindo(a) novamente!</C.FormTitle>
                    <C.FormDescription>Use os dados fornecidos para entrar</C.FormDescription>
                </C.FormHeader>
                <C.Form>
                    <C.Label>Utilizador/E-mail</C.Label>
                    <C.Input type='text' placeholder='email@gmail.com'/>
                    
                    <C.Label>Palavra-Passe</C.Label>
                    <C.Input type='password' placeholder='Palavra-passe'/>
                    
                    <C.Button>Entrar</C.Button>
                    <C.ForgotPassword>Esqueceu-se da palavra-passe?</C.ForgotPassword>
                </C.Form>
            </C.FormContainer>
        </C.LoginContainer>
    )
}