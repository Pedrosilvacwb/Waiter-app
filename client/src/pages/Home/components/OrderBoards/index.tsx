import { useState, useContext } from "react";
import { OrdersProps } from "../../../../types";
import OrderModal from "../OrderModal";
import { Board, OrdersContainer } from "./styles";
import { OrderContext } from "../../../../context/OrdersContext";

interface OrderBoardsProps {
  title: string;
  icon: string;
  orders?: OrdersProps[];
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: OrdersProps["status"]) => void;
}
const OrderBoards = ({
  title,
  icon,
  orders,
  onCancelOrder,
  onChangeOrderStatus,
}: OrderBoardsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | OrdersProps>(null);
  const [loading, setLoading] = useState(false);

  const { deleteOrder, changeOrderStatus, finishSelectedOrder } =
    useContext(OrderContext);

  const handleOpenOrderModal = (order: OrdersProps) => {
    setIsOpen(true);
    setSelectedOrder(order);
  };

  const handleCloseOrderModal = () => {
    setIsOpen(false);
    setSelectedOrder(null);
  };

  const handleCancelOrder = async () => {
    setLoading(true);
    deleteOrder(selectedOrder);

    onCancelOrder(selectedOrder!._id);
    setLoading(false);
    setIsOpen(false);
  };

  const handleChangeOrderStatus = async () => {
    setLoading(true);
    const newStatus =
      selectedOrder?.status === "WAITING" ? "IN_PRODUCTION" : "DONE";
    changeOrderStatus(selectedOrder, newStatus);
    onChangeOrderStatus(selectedOrder!._id, newStatus);
    setLoading(false);
    setIsOpen(false);
  };
  const handleFinishOrder = async () => {
    setLoading(true);
    finishSelectedOrder(selectedOrder);
    setLoading(false);
    setIsOpen(false);
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
        isLoading={loading}
        onCancelOrder={handleCancelOrder}
        order={selectedOrder}
        isOpen={isOpen}
        onClose={handleCloseOrderModal}
        onChangeStatus={
          selectedOrder?.status === "DONE"
            ? handleFinishOrder
            : handleChangeOrderStatus
        }
      />
    </Board>
  );
};

export default OrderBoards;
