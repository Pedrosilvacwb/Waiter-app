import { styled } from "styled-components";

export const DateContainer = styled.div`
  margin-bottom: 32px;
  span {
    font-size: 14px;
    display: block;
    margin-bottom: 8px;
  }
`;

export const ModalBody = styled.div`
  margin-bottom: 32px;
  max-height: 250px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  > span {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 16px;
  }
`;

export const OrderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  .photo {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    img {
      width: 48px;
      height: 40px;
      object-fit: cover;
      border-radius: 8px;
    }
    span {
      color: #999;
    }
  }

  .product {
    display: flex;
    flex-direction: column;
    gap: 4px;

    span {
      color: #666;
    }
  }
`;

export const Total = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
