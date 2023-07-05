import { OrderDetails } from "./styles";

import { OrdersProps } from "../../../../types";
import { formatCurrency } from "../../../../utils/FormatCurrency";

import Modal from "../../../../components/Modal";

interface OrderModalProps {
  isOpen: boolean;
  order: null | OrdersProps;
  onClose: () => void;
  onCancelOrder: () => Promise<void>;
  isLoading: boolean;
  onChangeStatus: () => Promise<void>;
}

const OrderModal = ({
  isOpen,
  order,
  onClose,
  onCancelOrder,
  isLoading,
  onChangeStatus,
}: OrderModalProps) => {
  const total = order?.products.reduce((att, { product, quantity }) => {
    return att + product.price * quantity;
  }, 0);

  const actionLabel =
    (order?.status === "WAITING" && "🧑‍🍳 Iniciar Preparo") ||
    (order?.status === "IN_PRODUCTION" && "✅ Concluir pedido") ||
    (order?.status === "DONE" && "Arquivar Pedido") ||
    "";

  return (
    <Modal
      onAction={onChangeStatus}
      onClose={onClose}
      actionLabel={actionLabel}
      cancelLabel={
        order?.status === "DONE" ? "Remover Pedido" : "Cancelar pedido"
      }
      onCancel={onCancelOrder}
      title={`Mesa ${order?.table}`}
      visible={isOpen}
    >
      <div className="status-container">
        <small>Status do pedido </small>
        <div>
          <strong>
            {order?.status === "WAITING" && "Fila de espera"}
            {order?.status === "IN_PRODUCTION" && "Em produção"}
            {order?.status === "DONE" && "Pronto"}
          </strong>
        </div>
      </div>
      <OrderDetails>
        <strong>Itens</strong>
        <div className="order-itens">
          {order?.products.map(({ _id, quantity, product }) => (
            <div className="item" key={_id}>
              <img
                src={`http://192.168.0.13:3001/uploads/${product.imagePath}`}
                alt={product.name}
                width={56}
                height={28}
              />
              <span className="quantity">{quantity}x</span>
              <div className="product-details">
                <strong>{product.name}</strong>
                <span>{formatCurrency(product.price)}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="total">
          <span>Total</span>
          <strong>{formatCurrency(total as number)}</strong>
        </div>
      </OrderDetails>
    </Modal>
  );
};

export default OrderModal;
