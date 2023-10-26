import styled from "styled-components";

interface Button {
    color?: string;
}

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
    margin-left: 25px
`

export const Left = styled.div`
    width: 257px;
    display: flex;
    flex-direction: column;
    gap: 9px;
    margin-top: 35px;
`

export const RightImage = styled.img`
    width: 590px;
    height: 470px;
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
    white-space: nowrap;
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 8px;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`

export const LabelContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
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

export const Required = styled.span`
    color: #D14444;
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`

export const Input = styled.input`
    width: 100%;
    height: 30px;
    flex-shrink: 0;
    background-color: #282A2F;
    border: none;
    outline: #17B4BB solid 0.5px;
    border-radius: 6px;
    stroke-width: 0.5px;
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.11));
    padding: 10px;
    color: #FFF;
    margin-bottom: 22px;
    font-family: 'Poopins', sans-serif;
    font-size: 12px;
`

export const CheckBoxContainer = styled.div`

    .customcheckbox input {
        display: none;
    }

    .customcheckbox input + label:before {
        vertical-align: middle;
        content: "";
        width: 15px;
        height: 15px;
        border-radius: 2px;
        background: rgba(71, 158, 183, 0.4);
        backdrop-filter: blur(5px);
        border-radius: 3px;
        display: inline-block;
        margin-right: 8px;
        align-items: center;
    }

    .customcheckbox input:checked + label:before {
        background-image: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 10 10'%3E%3Cg class='nc-icon-wrapper' stroke-width='1' fill='%23555555'%3E%3Cpath fill='none' stroke='%23FFFFFF' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' data-cap='butt' d='M2.83 4.72l1.58 1.58 2.83-2.83'/%3E%3C/g%3E%3C/svg%3E");
        background-color: rgba(71, 158, 183, 1);
        backdrop-filter: blur(5px);
        background-position: center;
        border: none;;
    }

    label {
        color: #696F79;
        font-family: 'Poppins', sans-serif;
        font-size: 11px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
`

export const Button = styled.button<Button>`
    width: 100%;
    height: 32px;
    flex-shrink: 0;
    border-radius: 6px;
    background: ${props => props.color ?? "#479EA2"};
    color: #FFF;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    outline: none;
    border: none;
    margin-top: ${props => props.color ? "5px" : "22px"};;

    transition: filter 0.5s;
    ${props => props.color && `
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 30px;
        padding: 0 40px;
    `}



    &:hover {
        cursor: pointer;

        ${props => !props.color && `
            filter: drop-shadow(0px 2px 5px #479EA2);
        `}
    }
`

export const DividerContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 15px;
    gap: 12px;
    align-items: center;
`

export const Divider = styled.div`
    width: 50px;
    height: 1px;
    background: #F5F5F5;
`

export const DividerText = styled.span`
    color: #BABABA;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`