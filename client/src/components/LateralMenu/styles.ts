import { styled, keyframes } from "styled-components";

interface TabContainerProps {
  color: string;
}

export const Container = styled.div`
  width: 108px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0px 32px;
  background: #ffffff;
  box-shadow: 10px 0px 32px 0px rgba(204, 204, 204, 0.1);
  position: fixed;
  left: 0;
  top: 0;
`;

export const Logo = styled.span`
  color: #666;
  font-size: 24px;
  > strong {
    font-weight: 700;
  }
`;

export const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const displaySelected = keyframes`
  from {width:0}
  to {width:12px}
`;

export const TabContainer = styled.button<TabContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: transparent;
  font-weight: 500;
  border: none;
  padding: 32px 21px;
  font-size: 14px;
  color: ${({ color }: { color: string }) => color || "#333"};

  img {
    width: 24px;
    height: 24px;
  }

  .selected {
    width: 12px;
    height: 0px;
    border: 1.5px solid #d73035;
    animation: ${displaySelected} 0.4s forwards;
  }

  .unselected {
    width: 12px;
    height: 0px;
    border: 1.5px solid transparent;
  }
`;
