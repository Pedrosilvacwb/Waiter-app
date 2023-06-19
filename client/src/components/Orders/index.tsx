import { Container } from "./styles";
import OrderBoards from "../OrderBoards";
import { useEffect, useState } from "react";
import { OrdersProps } from "../../types";
import { api } from "../../utils/api";
import socketIo from "socket.io-client";

const Orders = () => {
  const [orders, setOrders] = useState<OrdersProps[]>([]);

  useEffect(() => {
    const socket = socketIo("http://localhost:3001", {
      transports: ["websocket"],
    });

    socket.on("order@new", (order) => {
      setOrders((prev) => prev.concat(order));
    });
  }, []);

  const getOrders = () => {
    api.get("/orders").then(({ data }) => {
      setOrders(data);
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  const waiting = orders.filter((order) => order.status === "WAITING");
  const inProduction = orders.filter(
    (order) => order.status === "IN_PRODUCTION"
  );
  const done = orders.filter((order) => order.status === "DONE");

  const handleCancelOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((order) => order._id !== orderId));
  };

  const handleOrderStatusChange = (
    orderId: string,
    status: OrdersProps["status"]
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, status } : order
      )
    );
  };
  return (
    <Container>
      <OrderBoards
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
        orders={waiting}
        icon="🕛"
        title="Fila de espera"
      />
      <OrderBoards
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
        orders={inProduction}
        icon="🧑‍🍳"
        title="Em preparação"
      />
      <OrderBoards
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
        orders={done}
        icon="✅"
        title="Pronto!"
      />
    </Container>
  );
};

export default Orders;
