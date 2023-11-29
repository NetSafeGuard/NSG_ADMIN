import styled from "styled-components";
import { Card } from "../ui/card";

export const StyledCard = styled(Card)`
  transition: transform 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    opacity: 0.8;
  }
`;