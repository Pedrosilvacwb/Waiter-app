import { Actions, ModalBody, OrderDetails, Overlay } from "./styles";
import close from "../../assets/images/close-icon.svg";
import { OrdersProps } from "../../types";
import { formatCurrency } from "../../utils/FormatCurrency";

interface OrderModalProps {
  isOpen: boolean;
  order: null | OrdersProps;
  onClose: () => void;
}

const OrderModal = ({ isOpen, order, onClose }: OrderModalProps) => {
  if (!isOpen) {
    return null;
  }

  const total = order?.products.reduce((att, { product, quantity }) => {
    return att + product.price * quantity;
  }, 0);

  return (
    <Overlay onClick={onClose}>
      <ModalBody onClick={(e) => e.stopPropagation()}>
        <header>
          <strong>Mesa {order?.table}</strong>
          <button type="button" onClick={onClose}>
            <img src={close} alt="Botão para fechar o modal" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do pedido</small>
          <div>
            <span>
              {order?.status === "WAITING" && "🕛"}
              {order?.status === "IN_PRODUCTION" && "🧑‍🍳"}
              {order?.status === "DONE" && "✅"}
            </span>
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
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
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

        <Actions>
          <button type="button" className="primary">
            <span>🧑‍🍳</span>
            <strong>Iniciar produção</strong>
          </button>
          <button type="button" className="secondary">
            <strong>Cancelar pedido</strong>
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
};

export default OrderModal;
