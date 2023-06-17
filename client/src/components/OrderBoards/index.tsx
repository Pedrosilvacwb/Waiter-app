import { useState } from "react";
import { OrdersProps } from "../../types";
import OrderModal from "../OrderModal";
import { Board, OrdersContainer } from "./styles";

interface OrderBoardsProps {
  title: string;
  icon: string;
  orders?: OrdersProps[];
}
const OrderBoards = ({ title, icon, orders }: OrderBoardsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | OrdersProps>(null);

  const handleOpenOrderModal = (order: OrdersProps) => {
    setIsOpen(true);
    setSelectedOrder(order);
  };

  const handleCloseOrderModal = () => {
    setIsOpen(false);
    setSelectedOrder(null);
  };

  return (
    <Board>
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders?.length})</span>
      </header>

      {!!orders?.length && (
        <OrdersContainer>
          {orders?.map((order) => (
            <button
              key={order._id}
              type="button"
              onClick={() => handleOpenOrderModal(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}
      <OrderModal
        order={selectedOrder}
        isOpen={isOpen}
        onClose={handleCloseOrderModal}
      />
    </Board>
  );
};

export default OrderBoards;
