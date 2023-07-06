import styled from "styled-components";

export const Container = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background-color: transparent;
  font-weight: 600;
  font-size: 16px;
  color: #d73035;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
