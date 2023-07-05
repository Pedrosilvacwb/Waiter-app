import { styled } from "styled-components";

export const ModalForm = styled.div`
  margin-top: 24px;

  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: #666;
    margin-bottom: 24px;

    label {
      font-size: 14px;
    }

    input {
      border: 1px solid #cccccc;
      border-radius: 8px;
      padding: 16px;
    }
  }
`;
