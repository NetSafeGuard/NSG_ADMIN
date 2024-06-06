import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
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

export const MenuContainer = styled.div`
  margin-left: 16px;
  display: flex;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  background-color: #c5cdd7;
  opacity: 1;
  border-radius: 8px;
  cursor: pointer;

  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
`;

export const MenuIconContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MenuItem = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;

  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.4;
  }
`;

export const MenuText = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
`;
