import styled, { css } from "styled-components";

interface InputProps {
  error: boolean | string | undefined;
  type: string;
  placeholder: string;
}

export default styled.input<InputProps>`
  width: 100%;
  background: #fff;
  border: none;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  height: 56px;
  border-radius: 8px;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  transition: border-color 0.2s ease-in;
  appearance: none;

  &:focus {
    border-color: #666;
  }

  ${({ error }) =>
    error &&
    css`
      border-color: #d73035 !important;
    `}

  &[disabled] {
    background-color: #fafafa;
    border-color: #ccc;
  }
`;
