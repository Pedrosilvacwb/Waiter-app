import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    width: 380px;
    color: #333;
    > span,
    > h1 {
      display: block;
      text-align: center;
    }
    > span {
      font-size: 16px;

      font-weight: 500;
      line-height: 150%;
    }
    > h1 {
      font-weight: 400;

      strong {
        font-weight: 700;
      }
    }
  }
`;

export const Form = styled.form`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  > button {
    margin-top: 8px;
  }
`;
