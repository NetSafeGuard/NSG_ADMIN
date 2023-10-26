import * as C from './style';
import Logo from '../../assets/Logo.png';
import RightImg from '../../assets/rightimg.png';

export const LoginPage = () => {
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
                    </C.Left>    
                    <div>
                        <img src={RightImg} alt="RightImg" />
                    </div>
                </C.Separator>  
            </C.Content>
        </C.LoginContainer>
    )
}