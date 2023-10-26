import styled from "styled-components";

export const LoginContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    background-color: #202227;
    flex-direction: column;
`

export const Content = styled.div`
    margin: 22px;
`

export const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const Logo = styled.img`
    width: 40px;
    height: 40px;
`

export const LogoText = styled.span`
    color: #FFF;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`

export const Separator = styled.div`
    display: flex;
    justify-content: space-between;
`

export const Left = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 48px;
`

export const WelcomeText = styled.span`
    color: #FFF;
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`