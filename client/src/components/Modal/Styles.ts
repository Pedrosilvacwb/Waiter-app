import { css, keyframes, styled } from "styled-components";

const fadeIn = keyframes`
  from {opacity: 0;}
  to {opacity: 1;}
`;
const fadeOut = keyframes`
  0% {opacity: 1;}
  30% {opacity: 1;}
  100% {opacity: 0;}
`;
const scaleIn = keyframes`
  0% {transform: scale(0);}
  70% {transform: scale(1.2);}
  100% {transform: scale(1);}
`;
const scaleOut = keyframes`
  0% {transform: scale(1);}
  30% {transform: scale(1.2);}
  100% {transform: scale(0);}
`;

interface ModalProps {
  isLeaving: boolean;
}

export const Overlay = styled.div<ModalProps>`
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4.5px);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: ${fadeIn} 0.4s;

  ${({ isLeaving }) =>
    isLeaving &&
    css`
      animation: ${fadeOut} 0.3s forwards;
    `}
`;

export const Content = styled.div<ModalProps>`
  background: #fff;
  width: 480px;
  border-radius: 8px;
  padding: 32px;
  animation: ${scaleIn} 0.4s;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  ${({ isLeaving }) =>
    isLeaving &&
    css`
      animation: ${scaleOut} 0.3s forwards;
    `}

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 48px;

    strong {
      font-size: 24px;
    }

    button {
      border: none;
      background: transparent;
      display: flex;
    }
  }
`;

export const ModalBody = styled.div`
  text-align: center;
  line-height: 24px;
  color: #333;
  font-weight: 500;

  p {
    margin-bottom: 16px;
  }
`;

export const ModalFooter = styled.div`
  margin-top: 62px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 42px;
`;
