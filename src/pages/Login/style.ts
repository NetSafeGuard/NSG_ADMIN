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

export const RightImage = styled.img`
    width: 590px;
    height: 450px;
`

export const WelcomeText = styled.span`
    color: #FFF;
    font-family: 'Poppins', sans-serif;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`

export const WelcomeSecondText = styled.span`
    color: #8692A6;
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 20px;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`

export const Label = styled.label`
    color: #696F79;
    font-family: "Poppins", sans-serif;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 7px;

`

export const Input = styled.input`
    width: 203px;
    height: 30px;
    flex-shrink: 0;
    background-color: #282A2F;
    border: none;
    outline: #17B4BB solid 0.5px;
    border-radius: 6px;
    stroke-width: 0.5px;
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.11));
    padding: 5px;
    color: #FFF;
    margin-bottom: 25px;
    
`