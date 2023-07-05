/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DateContainer, OrderContainer, ModalBody, Total } from "./styles";

import Modal from "../../../../components/Modal";
import { OrdersProps } from "../../../../types";
import { formatDate } from "../../../../utils/FormatDate";
import { formatCurrency } from "../../../../utils/FormatCurrency";
import { useContext } from "react";
import { OrderContext } from "../../../../context/OrdersContext";

interface SummaryModalProps {
  visible: boolean;
  onClose: () => void;
  selectedOrder: OrdersProps | null;
}

const SummaryModal = ({
  visible,
  onClose,
  selectedOrder,
}: SummaryModalProps) => {
  const { deleteOrder, setFinishedOrders } = useContext(OrderContext);
  if (!selectedOrder) return null;

  const total = selectedOrder?.products.reduce(
    (acc, att) => acc + att.quantity * att.product.price,
    0
  );

  const handleRemoveOrder = () => {
    const isEdit = true;
    deleteOrder(selectedOrder, isEdit);
    setFinishedOrders((prev) =>
      prev.filter((order) => order._id !== selectedOrder._id)
    );

    onClose();
  };

  return (
    <Modal
      visible={visible}
      title={`Mesa ${selectedOrder.table}`}
      onClose={onClose}
      cancelLabel="Excluir Registro"
      onCancel={handleRemoveOrder}
    >
      <DateContainer>
        <span>Data do pedido</span>
        <strong>{formatDate(selectedOrder.createdAt!)}</strong>
      </DateContainer>
      <ModalBody>
        <span>Itens</span>
        {selectedOrder.products.map((item) => (
          <OrderContainer key={item._id}>
            <div className="photo">
              <img
                src={`http://192.168.0.13:3001/uploads/${item.product.imagePath}`}
                alt="Foto do produto"
              />
              <span>{item.quantity}x</span>
            </div>
            <div className="product">
              <strong>{item.product.name}</strong>
              <span>{formatCurrency(item.quantity * item.product.price)}</span>
            </div>
          </OrderContainer>
        ))}
      </ModalBody>
      <Total>
        <span>Total</span>
        <strong>{formatCurrency(total)}</strong>
      </Total>
    </Modal>
  );
};

export default SummaryModal;
