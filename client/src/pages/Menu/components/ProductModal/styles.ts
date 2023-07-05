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
  z-index: 1000;
  animation: ${fadeIn} 0.4s;

  ${({ isLeaving }) =>
    isLeaving &&
    css`
      animation: ${fadeOut} 0.3s forwards;
    `}
`;

export const Content = styled.div<ModalProps>`
  background: #fff;
  padding: 32px;
  border-radius: 8px;
  width: 928px;
  overflow-y: auto;
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
    margin-bottom: 34px;

    strong {
      font-size: 24px;
    }
    button {
      border: none;
      background: transparent;
      img {
        width: 24px;
        height: 24px;
      }
    }
  }

  .modal-body {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
  }
`;

export const ProductDetails = styled.div`
  .image-container {
    margin-bottom: 24px;
    strong {
      font-size: 18px;
      color: #666666;
      margin-bottom: 12px;
      display: block;
    }
    .image {
      border: 1px solid #cccccc;
      border-radius: 8px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;

      img: {
        width: 100%;
        object-fit: cover;
        border-radius: 8px;
      }
      > button {
        padding: 24px;
        align-self: center;
      }
    }
  }

  .product-details-container {
    div {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 32px;

      label {
        font-size: 14px;
        color: #333333;
      }

      input,
      textarea {
        border: 1px solid #cccccc;
        border-radius: 8px;
        padding: 16px;
      }

      span {
        font-size: 14px;
        color: #666666;
        display: block;
      }
    }
  }

  .category-container {
    > span {
      font-weight: 400;
      font-size: 14px;
      color: #666666;
      display: block;
      margin-bottom: 16px;
    }

    .categories {
      max-width: 450px;
      max-height: 120px;
      display: flex;
      overflow-y: auto;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 16px;
      &::-webkit-scrollbar-track {
        background-color: #f4f4f4;
      }
      &::-webkit-scrollbar {
        width: 6px;
        background: #f4f4f4;
      }
      &::-webkit-scrollbar-thumb {
        background: #dad7d7;
      }

      span {
        display: block;
        padding: 14px;
        background: #ffffff;
        box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
        border-radius: 75px;
        border: 1px solid #ccc;
        cursor: pointer;
      }
      > span.selected {
        border: 1px solid #d73035;
      }
    }
  }
`;

export const ProductIngredients = styled.div`
  width: 50%;
  .ingredients-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    strong {
      font-size: 18px;
      color: #666666;

      display: block;
    }
  }
`;

export const IngredientsList = styled.div`
  width: 100%;
  margin-top: 42px;
  margin-bottom: 16px;
  max-height: 400px;
  min-height: 400px;
  overflow-y: auto;
  &::-webkit-scrollbar-track {
    background-color: #f4f4f4;
  }
  &::-webkit-scrollbar {
    width: 6px;
    background: #f4f4f4;
  }
  &::-webkit-scrollbar-thumb {
    background: #dad7d7;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    margin-bottom: 8px;
    border: 1px solid rgba(204, 204, 204, 0.3);
    border-radius: 8px;
  }
`;

export const ModalFooter = styled.footer`
  margin-top: 34px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  button {
    max-width: 30%;
  }
`;

export const NoResult = styled.div`
  strong {
    color: #d73035;
  }
`;
