import styled from "styled-components";

export const ModalForm = styled.div`
  > div {
    margin-top: 24px;

    .radio-container {
      display: flex;
      gap: 32px;
      margin-top: 24px;

      > div {
        display: flex;
        align-items: center;
        gap: 8px;

        input[type="radio"] {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          outline: none;
        }

        input[type="radio"]:before {
          content: "";
          display: block;
          width: 60%;
          height: 60%;
          margin: 20% auto;
          border-radius: 50%;
        }
        input[type="radio"]:checked:before {
          background: #d73035;
          border: #d73035;
        }
        input[type="radio"]:checked + label {
          color: #d73035;
        }
      }
    }
  }
`;
