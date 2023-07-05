import Modal from "../../../../components/Modal";
import { ModalBody } from "../../../../components/Modal/Styles";
import { useContext } from "react";
import { OrderContext } from "../../../../context/OrdersContext";

interface RefreshModalProps {
  visible: boolean;
  onClose: () => void;
}

const RefreshModal = ({ visible, onClose }: RefreshModalProps) => {
  const { fisnishAllOrders } = useContext(OrderContext);

  const handleRefresh = async () => {
    fisnishAllOrders();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      actionLabel="Sim, reiniciar o dia"
      cancelLabel="Não, continuar pedidos"
      onAction={handleRefresh}
      title={"Reiniciar o dia"}
      onClose={onClose}
    >
      <ModalBody>
        <p>
          Ao reiniciar o dia, todos os pedidos serão arquivados no status atual.
        </p>
        <span>Deseja reiniciar o dia?</span>
      </ModalBody>
    </Modal>
  );
};

export default RefreshModal;
