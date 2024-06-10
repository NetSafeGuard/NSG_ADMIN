import styled from "styled-components";

export const MainContent = styled.main`
  z-index: 999999999999;
  padding-top: 32px;
  position: relative;
`;

export const TitleBarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 32px;
  background-color: #f8f8f8;
  border-radius: 7px 7px 7px 0px;
  border: none;
  outline: none;
  mix-blend-mode: multiply;
  box-shadow: 0px 2px 21px 0px rgba(0, 0, 0, 0.22),
    0px 32px 64px 0px rgba(0, 0, 0, 0.28);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
`;

export const TitleBarTitle = styled.div`
  font-family: "Poppins", sans-serif;
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

interface ButtonProps {
  close?: boolean;
}

export const Button = styled.div<ButtonProps>`
  width: 46px;
  height: 32px;
  background: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: ${(props: ButtonProps) => (props.close ? "#EF2525" : "#f0f0f0;")};

    ${(props: ButtonProps) => props.close && `
      img {
        filter: invert(100%);
      }
    `
  }
`;
