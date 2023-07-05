import { styled } from "styled-components";

export const Header = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  strong {
    color: #333333;
    font-weight: 600;
    font-size: 18px;
    line-height: 120%;
    margin-right: 8px;
  }
  span {
    display: inline-block;
    background: rgba(204, 204, 204, 0.2);
    border-radius: 4px;
    padding: 4px 8px;
  }
`;
