import styled from "styled-components";

interface SelectedProps {
    menuselected?: boolean;
}

export const Container = styled.div`
    width: 64px;
    height: 100vh;
    display: flex;
    background-color: #202227;
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

export const Icon = styled.div<SelectedProps>`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;

    transition: all 0.5s ease-in-out;

    ${({ menuselected }) => menuselected && `
        background-color: #F8FAFC;
        svg * {
            color: black
        }

    `}

    &:hover {
        cursor: pointer;
        transform: scale(0.98);
        filter: drop-shadow(1px 1px 3px rgba(255, 255, 255, 0.3));
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