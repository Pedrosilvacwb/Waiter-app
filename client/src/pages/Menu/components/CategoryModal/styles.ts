import styled from "styled-components";

export const ModalBody = styled.div`
  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 32px;

    label {
      font-size: 14px;
    }

    input {
      border-radius: 8px;
      border: 1px solid var(--gray-200, #ccc);
      padding: 16px;
    }
  }
`;
