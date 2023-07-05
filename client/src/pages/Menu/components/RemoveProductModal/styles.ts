import { styled } from "styled-components";

export const ProductContainer = styled.div`
  margin: 24px 32px 64px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 8px;

  img {
    max-width: 160px;
    max-height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }

  div {
    padding: 16px 0;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    strong {
      margin: 12px 0;
    }
  }
`;
