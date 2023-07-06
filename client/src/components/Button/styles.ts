import styled from "styled-components";

export const Container = styled.button`
  background: #d73035;
  border-radius: 48px;
  border: 0;
  color: #fff;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  flex: 1;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
