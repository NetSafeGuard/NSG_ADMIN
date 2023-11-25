import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
  object-fit: cover;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Username = styled.span`
  color: #0d1829;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 14px;
`;

export const Role = styled.span`
  color: #61758a;
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 13px;
`;
