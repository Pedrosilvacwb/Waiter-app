import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(204, 204, 204, 0.4);
  display: flex;
  margin-bottom: 32px;

  .selected {
    background: #fff;
    color: #d73035;
    font-weight: 600;
    padding: 16px 64px;

    border: none;
  }
  .unselected {
    padding: 16px 64px;

    border: none;
    background: transparent;
  }
`;
