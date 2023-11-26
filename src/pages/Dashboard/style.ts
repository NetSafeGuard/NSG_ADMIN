import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 32px);
  display: flex;
  background-color: #f8f8f8;
`;

export const Content = styled.div`
  width: 100vw;
  height: calc(100% - 50px);
`;

export const Row = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 32px;
  margin-top: 15px;
`;
