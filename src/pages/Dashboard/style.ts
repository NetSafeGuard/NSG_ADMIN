import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: calc(100% - 32px);
  display: flex;
  background-color: #f8f8f8;
`;

export const Content = styled.div`
  width: 100vw;
  height: 100%;
`;

export const Pages = styled.div`
  width: 100%;
  display: flex;
  overflow-y: hidden;
  max-height: calc(100vh - 60px);
  margin-top: 20px;
`;

export const MainContent = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Row = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 32px;
  margin-top: 15px;
`;
