import { css, keyframes, styled } from "styled-components";

const scaleIn = keyframes`
  0% {transform: scale(0);}
  70% {transform: scale(1.2);}
  100% {transform: scale(1);}
`;
const fadeIn = keyframes`
  from {opacity: 0;}
  to {opacity: 1;}
`;
const fadeOut = keyframes`
  0% {opacity: 1;}
  30% {opacity: 1;}
  100% {opacity: 0;}
`;

interface SplshModalProps {
  isLeaving: boolean;
}

export const Background = styled.div<SplshModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: #d73035;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ isLeaving }) =>
    isLeaving &&
    css`
      animation: ${fadeOut} 1s forwards;
    `}
`;

export const Image = styled.img`
  animation: ${scaleIn} 1s;
`;
