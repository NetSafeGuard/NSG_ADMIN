import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 32px);
  display: flex;
  background-color: #f8f8f8;
`;

export const Content = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 32px;
  margin-top: 15px;
`;

export const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
