import styled from "styled-components";

export const Container = styled.table`
  width: 100%;
  text-align: left;
  border: 1px solid rgba(204, 204, 204, 0.4);
  border-radius: 8px;

  thead {
    background: rgba(204, 204, 204, 0.2);
    color: #333333;
    opacity: 0.9;

    th {
      padding: 12px 16px;
    }
  }

  tbody {
    background: #fff;
    tr {
      td {
        padding: 16px;
        max-width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        > button {
          border: none;
          background: transparent;
        }

        > button + button {
          margin-left: 16px;
        }
        img {
          width: 48px;
          height: 48px;
          object-fit: cover;
          border-radius: 4px;
        }
      }
    }
  }
`;
