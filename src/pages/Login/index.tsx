import { useEffect, useContext } from 'react';
import * as C from './style';
import { RiLoginCircleLine } from 'react-icons/ri';
import { LoginSchema } from '../../schemas/LoginSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginData } from '../../@types/LoginData';
import { AuthContext } from '../../global/contexts/AuthContext';
import { Loading } from '../../components/loading';
import { Spinner } from '../../components/spinner';
import { Error } from '../../components/error';

export const LoginPage = () => {

    const { Login, Verify, isLoading, isGlobalLoading } = useContext(AuthContext);


    useEffect(() => {
        Verify();
    }, [])

    const {register,handleSubmit,watch, formState:{errors}} = useForm<LoginData>({
        resolver: yupResolver(LoginSchema),
    });

    if(isGlobalLoading) return (
        <Loading/>
    )
    
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
                <C.Form onSubmit={handleSubmit(Login)}>
                    <C.Label>
                        Utilizador/E-mail 
                        {errors.user && <Error error={'*'}/>}
                    </C.Label>
                    <C.Input 
                        type='text' 
                        placeholder='email@gmail.com'
                        {...register("user")}
                        onFocus={() => watch("user") ? true : false}
                    />
                    
                    <C.Label>
                        Palavra-Passe
                        {errors.password && <Error error={'*'}/>}
                    </C.Label>
                    <C.Input 
                        type='password' 
                        placeholder='Palavra-passe'
                        {...register("password")}
                        onFocus={() => watch("password") ? true : false}
                    />
                    
                    <C.Button>{isLoading ? <Spinner/> : 'Entrar'}</C.Button>
                </C.Form>
            </C.FormContainer>
        </C.LoginContainer>
    )
}