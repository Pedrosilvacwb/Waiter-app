import { Container } from "./styles";
import OrderBoards from "../OrderBoards";
import { orders } from "../../orders";

const Orders = () => {
  return (
    <Container>
      <OrderBoards orders={orders} icon="🕛" title="Fila de espera" />
      <OrderBoards icon="🧑‍🍳" title="Em preparação" />
      <OrderBoards icon="✅" title="Pronto!" />
    </Container>
  );
};

export default Orders;
