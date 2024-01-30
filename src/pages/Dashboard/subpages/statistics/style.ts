import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: calc(100% - 32px);
  padding: 50px 80px;
`;

export const Scroll = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: calc(100vh - 230px);
  overflow-x: hidden;
`;

export const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-weight: normal;
  color: #333333;
  margin-bottom: 30px;
`;
