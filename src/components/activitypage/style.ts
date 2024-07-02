import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: calc(100% - 32px);
  padding: 50px 80px;
  scroll-behavior: smooth;
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-weight: normal;
  color: #333333;
  margin-bottom: 20px;
  position: sticky;

  span {
    cursor: pointer;
    margin-right: 10px;
  }
`;

export const SubTitle = styled.h2`
  color: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const Description = styled.p`
  color: #333333;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: normal;
  margin-bottom: 20px;

  span {
    font-weight: 600
  }
`;


export const ButtonContainer = styled.div`
  position: fixed;
  bottom: 10px;
  left: 80px;
`;

export const ButtonDeleteContainer = styled.div`
  position: fixed;
  bottom: 70px;
  left: 80px;
`;

export const ActivityContainer = styled.div`
  width: 100%;
  display: flex;
  overflow-y: hidden;
  max-height: calc(100vh - 320px);
  margin-top: 20px;
`;