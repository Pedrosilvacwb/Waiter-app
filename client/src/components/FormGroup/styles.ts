import { styled } from "styled-components";

interface ContainerProps {
  error?: boolean;
}

export const Container = styled.div<ContainerProps>`
  & + & {
    margin-top: 16px;
  }

  label {
    font-size: 14px;
    display: block;
    margin-bottom: 8px;
    color: ${({ error }) => (error ? " #d73035" : "#666")};
  }

  .form-item {
    position: relative;

    .loader {
      position: absolute;
      top: 18px;
      right: 16px;
    }
  }
`;
