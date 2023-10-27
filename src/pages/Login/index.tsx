import * as C from './style';
import Logo from '../../assets/Logo.png';
import RightImg from '../../assets/rightimg.png';
import { AiOutlineMail } from 'react-icons/ai';
import { useContext, useEffect } from 'react';
import { Spinner } from '../../components/spinner';
import { LoginSchema } from '../../schemas/LoginSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Error } from '../../components/error';
import { LoginData } from '../../@types/LoginData';
import { AuthContext } from '../../global/contexts/AuthContext';
import { Loading } from '../../components/loading';

export const LoginPage = () => {

    const { Login, isLoading, error, Verify, isGlobalLoading } = useContext(AuthContext);

    useEffect(() => {
        Verify();
    }, [])

    const {register,handleSubmit,watch,formState: { errors}} = useForm<LoginData>({
        resolver: yupResolver(LoginSchema),
    });
    
    if(isGlobalLoading) return (
        <Loading/>
    )
    
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
                            <C.Form onSubmit={handleSubmit(Login)}>
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
                                    {isLoading ? <Spinner/> : 'Login'}
                                </C.Button>

                                <Error error={errors.email?.message || errors.password?.message ? 'Email ou palavra-passe inválida' : ''}/>

                                {error && <Error error={error}/>}
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