import styled from "styled-components";

interface SelectedProps {
    menuselected?: boolean;
}

export const Container = styled.div`
    width: 70px;
    height: 100vh;
    display: flex;
    background-color: white;
    flex-direction: column;
    align-items: center;
    padding-top: 24px;
`

export const Icons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;

`

export const Icon = styled.a<SelectedProps>`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    cursor: pointer;

    ${({ menuselected }) => menuselected && `
        svg * {
            color: #48B1A5
        }

    `}

    & svg {
        transition: 0.3s;
    }

    & svg:hover {
        filter: brightness(0.8);
        transform: scale(0.95);
    }

`

export const TopIcons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin-top: 50px;
`

export const BottomIcons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 20px;
`