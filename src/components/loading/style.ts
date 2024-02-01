import styled from "styled-components";
import { ErrorContent } from "../error/style";

export const GlobalLoading = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - 32px);
`;

export const Container = styled.div`
  position: absolute;
  bottom: 30px;
`;

export const Text = styled(ErrorContent)`
  font-size: 15px;
  color: #015593;
  font-family: "Poppins", sans-serif;
`;

export const Note = styled.h2`
  font-size: 20px;
  color: #015593;
  font-family: "Poppins", sans-serif;

  transition: 0.3s;
`;

export const Inline = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  transition: 0.3s;

  img {
    width: 50px;
  }
`;
