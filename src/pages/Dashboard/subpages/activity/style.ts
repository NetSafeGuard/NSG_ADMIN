import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: calc(100% - 32px);
  padding: 50px 80px;
  scroll-behavior: smooth;
`;

export const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-weight: normal;
  color: #333333;
  margin-bottom: 20px;
  position: sticky;
`;

export const ActivityDate = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 10px;
`;

export const ActivityContainer = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow-y: scroll;
  max-height: calc(100vh - 210px);
  padding-left: 5px;
  padding-right: 9px;

  ::-webkit-scrollbar {
    width: 5px;
  }
`;

export const ActivityCard = styled.div`
  flex-shrink: 0;
  width: 100%;
  min-height: 60px;
  background: #ffffff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 20px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(0.99);
  }
`;

export const ActivityTitle = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: normal;
  color: #333333;
  word-wrap: break-word;
  max-width: 100%;
`;

export const ActivityDescription = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: normal;
  color: #333333;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 80px;
`;


export const ContainerScroll = styled.div`
  width: 100%;
  height: calc(100% - 32px);
  padding-right: 20px;
  scroll-behavior: smooth;

  overflow-y: scroll;
  margin-top: 20px;
`;