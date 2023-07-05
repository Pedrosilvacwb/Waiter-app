import { useContext } from "react";
import Modal from "../../../../components/Modal";
import { OrdersProps } from "../../../../types";
import { OrderContext } from "../../../../context/OrdersContext";

interface RemoveOrderModal {
  visible: boolean;
  onClose: () => void;
  selectedOrder: OrdersProps | null;
}

const RemoveOrderModal = ({
  visible,
  onClose,
  selectedOrder,
}: RemoveOrderModal) => {
  if (!selectedOrder) return null;
  const { deleteOrder, setFinishedOrders } = useContext(OrderContext);

  const handleRemoveOrder = () => {
    deleteOrder(selectedOrder, true);
    setFinishedOrders((prev) =>
      prev.filter((order) => order._id !== selectedOrder._id)
    );

    onClose();
  };

  return (
    <Modal
      actionLabel="Remover Registro"
      onAction={handleRemoveOrder}
      onClose={onClose}
      visible={visible}
      title="Remover Registro"
    >
      <p>Deseja realmente remover esse registro?</p>
    </Modal>
  );
};

export default RemoveOrderModal;
