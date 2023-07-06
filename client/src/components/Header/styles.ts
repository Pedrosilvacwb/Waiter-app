import styled from "styled-components";

export const AppHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 48px;

  > button {
    display: flex;
    align-items: center;
    gap: 8px;
    border: none;
    background-color: transparent;
    font-weight: 600;
    font-size: 16px;
    color: #d73035;

    .image {
      width: 24px;
      height: 24px;
    }
  }
`;

export const Content = styled.div`
  flex: 1;

  > div {
    display: flex;
    align-items: center;
    gap: 8px;

    img {
      width: 32px;
      height: 32px;
    }

    strong {
      font-size: 34px;
      color: #333;
    }

    margin-bottom: 16px;
  }

  > span {
    font-size: 16px;
    color: #666;
    opacity: 0.9;
  }
`;
