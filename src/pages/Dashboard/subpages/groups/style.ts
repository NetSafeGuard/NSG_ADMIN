import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: calc(100% - 32px);
  padding: 50px 80px;
`;

export const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-weight: normal;
  color: #333333;
  margin-bottom: 30px;
`;

export const ActivityDescription = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: normal;
  color: #333333;
`;

export const ButtonContainer = styled.div`
  position: fixed;
  bottom: 10px;
  left: 80px;
`;

export const ActivityContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: calc(100vh - 210px);
  padding-right: 20px;
`;