import styled from "styled-components";

export const TitleBarContainer = styled.div`
    width: 100vw;
    height: 32px;
    background-color: #F8F8F8;
    border-radius: 7px 7px 7px 0px;
    border: none;
    outline: none;
    mix-blend-mode: multiply;
    box-shadow: 0px 2px 21px 0px rgba(0, 0, 0, 0.22), 0px 32px 64px 0px rgba(0, 0, 0, 0.28);
    position: sticky;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const TitleBarTitle = styled.div`
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    padding-left: 16px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Button = styled.div`
    width: 46px;
    height: 32px;
    background: #F8F8F8;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        background: #F0F0F0;
    }
`