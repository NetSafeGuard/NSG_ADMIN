import styled from "styled-components";

export const LoginContainer = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 32px);
    background-color: #F6F8FB;
    justify-content: center;
    align-items: center;
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    border: 1px solid #DEE4ED;
    background: #FFF;
    padding: 0px 0px 15px 0px;
    box-shadow: 0px 2px 4px 0px rgba(21, 29, 40, 0.04);
`

export const FormHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 31px 31px 0px 31px;

    @media (max-width: 768px) {
        padding: 21px 21px 0px 21px;
    }

    @media (max-height: 768px) {
        padding: 21px 21px 0px 21px;
    }
`

export const SignInIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F6F8FB;
    border-radius: 50%;
    margin-bottom: 16px;
`

export const FormTitle = styled.h1`
    color: #181E25;
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 23px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
    margin-bottom: 16px;
`

export const FormDescription = styled.p`
    color: #788BA5;
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 19.992px; 
`

export const Form = styled.form`
    display:flex;
    flex-direction: column;
    padding: 0px 25px;
    justify-content: center;
`

export const Label = styled.label`
    display: flex;
    align-items: center;
    color: #181E25;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 19.992px;
    margin-bottom: 8px;
    margin-top: 23px;
    gap: 5px;
`

export const Input = styled.input`
    height: 40px;
    padding: 11px 13px 12px 13px;
    align-items: center;
    border-radius: 6px;
    border: 1px solid #DEE4ED;
    background: #FFF;
    box-shadow: 0px 1px 2px 0px rgba(21, 29, 40, 0.03);
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    outline: none;

    transition: border-color 0.5s;

    &:focus {
        border: 1px solid #624DE3;
    }

    &::placeholder {
        color: #788BA5;
    }
`

export const Button = styled.button`
    margin-top: 27px;
    height: 40px;
    border-radius: 6px;
    border: 1px solid #48B1A5;
    background: #48B1A5;
    border: none;
    box-shadow: 0px 1px 2px 0px rgba(21, 29, 40, 0.04), 0px 2px 0px 1px rgba(255, 255, 255, 0.08) inset;  
    color: #FFF;
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 19.992px;
    cursor: pointer;

    transition: background-color 0.5s;
    &:hover {
        background-color:  #3D9E92;
    }
`