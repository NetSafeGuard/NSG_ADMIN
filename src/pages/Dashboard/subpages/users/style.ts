import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 80px 0px 80px;
`;

export const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-weight: normal;
  color: #333333;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

export const Button = styled.button`
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #1b4c70;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    filter: drop-shadow(0px 0px 2px #1ac6ce);
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 23px;
`;

export const Input = styled.input`
  width: 400px;
  height: 35px;
  display: flex;
  padding-left: 5px;
  border-radius: 6px;
  border: 1px solid #dee4ed;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(21, 29, 40, 0.03);
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  outline: none;

  transition: border-color 0.5s;

  &:focus {
    border: 1px solid #624de3;
  }

  &::placeholder {
    color: #788ba5;
  }

  @media (max-width: 768px) {
    & {
      width: 200px;
    }
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  display: flex;
  overflow-y: hidden;
  max-height: calc(100vh - 280px);
  margin-top: 20px;
`;
