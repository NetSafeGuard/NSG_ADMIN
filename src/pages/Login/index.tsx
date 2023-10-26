import * as C from './style';
import Logo from '../../assets/Logo.png';
import RightImg from '../../assets/rightimg.png';
import { AiOutlineMail } from 'react-icons/ai';
import { api } from '../../services/api';
import { useState } from 'react';
import { Spinner } from '../../components/spinner';
import { LoginSchema } from '../../schemas/LoginSchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Error } from '../../components/error';

type LoginData = {
    email: string;
    password: string;
};

export const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const {register,handleSubmit,watch,formState: { errors}} = useForm<LoginData>({
        resolver: yupResolver(LoginSchema),
    });

    const handleLogin: SubmitHandler<LoginData> = (data) => {
        if(loading) return;
        setLoading(true);

        api.post('/auth/login', {
            email: data.email,
            password: data.password
        }).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            setError(error.response.data.message)
        }).finally(() => {
            setLoading(false)
        });
    }
    

    return (
        <C.LoginContainer>
            <C.Content>
                <C.LogoContainer>
                    <C.Logo src={Logo} alt="Logo" />
                    <C.LogoText>NetSafeGuard</C.LogoText>
                </C.LogoContainer>
                <C.Separator>
                    <C.Left>
                        <C.WelcomeText>Bem vindo(a) de volta 👋</C.WelcomeText>
                        <C.WelcomeSecondText>Estamos felizes em vê-lo(a) novamente</C.WelcomeSecondText>

                        <C.FormContainer>
                            <C.Form onSubmit={handleSubmit(handleLogin)}>
                                <C.LabelContainer>
                                    <C.Label>Endereço de email</C.Label>
                                    <C.Required>*</C.Required>
                                </C.LabelContainer>
                                <C.Input 
                                    type="email" 
                                    maxLength={40} 
                                    {...register("email")}
                                    onFocus={() => watch("email") ? true : false}
                                />
                                <C.LabelContainer>
                                    <C.Label>Palavra-passe</C.Label>
                                    <C.Required>*</C.Required>
                                </C.LabelContainer>
                                <C.Input 
                                    type="password" 
                                    maxLength={30} 
                                    {...register("password")}
                                />

                                <C.CheckBoxContainer>
                                    <div className="customcheckbox">
                                        <input type="checkbox" id="remember"/>
                                        <label htmlFor="remember">Eu concordo com os termos e condições</label>
                                    </div>
                                </C.CheckBoxContainer>

                                <C.Button >
                                    {loading ? <Spinner/> : 'Login'}
                                </C.Button>

                                <Error error={errors.email?.message || errors.password?.message ? 'Email ou palavra-passe inválida' : ''}/>
                            </C.Form>
                        </C.FormContainer>

                        <C.DividerContainer>
                            <C.Divider />
                            <C.DividerText>Alguma dificuldade?</C.DividerText>
                            <C.Divider />
                        </C.DividerContainer>
                        <C.Button color='#000'>
                            <AiOutlineMail size={15} style={{marginRight: '10px'}}/>
                            Contacte-nos
                        </C.Button>
                    </C.Left>    
                    <div>
                        <C.RightImage src={RightImg} alt="RightImg" />
                    </div>
                </C.Separator>  
            </C.Content>
        </C.LoginContainer>
    )
}