import * as C from './style';
import Logo from '../../assets/Logo.png'

export const LoginPage = () => {
    return (
        <C.LoginContainer>
            <C.Content>
                <C.LogoContainer>
                    <C.Logo src={Logo} alt="Logo" />
                    <C.LogoText>NetSafeGuard</C.LogoText>
                </C.LogoContainer>  
            </C.Content>
        </C.LoginContainer>
    )
}