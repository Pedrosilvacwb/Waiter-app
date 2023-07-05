import { styled } from "styled-components";

export const Overlay = styled.div`
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
  z-index: 100;
`;

export const Content = styled.div`
  padding: 32px;
  background: #fff;
  width: 480px;
  border-radius: 8px;
`;

export const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 48px;

  .title {
    display: flex;
    align-items: center;
    gap: 16px;

    .icon {
      width: 24px;
      height: 24px;
    }

    strong {
      font-size: 24px;
      color: #333;
    }
  }

  button {
    border: none;
    background: transparent;

    img {
      width: 24px;
      height: 24px;
    }
  }
`;
