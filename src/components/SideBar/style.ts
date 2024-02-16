import styled from "styled-components";

interface SelectedProps {
  menuselected?: boolean;
}

export const MainContent = styled.main`
  z-index: 2;
  position: relative;
  width: 70px;
  height: calc(100vh - 32px);
`;

export const Container = styled.div`
  width: 70px;
  height: calc(100vh - 32px);
  display: flex;
  background-color: white;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
  position: fixed;

  img {
    border-radius: 8px;
    width: 80px;
  }
`;

export const Icons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

export const Icon = styled.a<SelectedProps>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;

  ${({ menuselected }) =>
    menuselected &&
    `
		svg * {
			color: #015593
		}

	`}

  & svg {
    transition: 0.3s;
  }

  & svg:hover {
    filter: brightness(0.8);
    transform: scale(0.95);
  }
`;

export const TopIcons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: 50px;

  @media (max-height: 500px) {
    gap: 12px;
  }
`;

export const BottomIcons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 20px;

  @media (max-height: 500px) {
    gap: 12px;
  }
`;
