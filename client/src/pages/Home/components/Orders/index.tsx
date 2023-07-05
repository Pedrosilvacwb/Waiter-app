import { Container } from "./styles";
import OrderBoards from "../OrderBoards";
import { useEffect, useState } from "react";
import { OrdersProps } from "../../../../types";

import socketIo from "socket.io-client";

interface OrdersComponentProps {
  orders: OrdersProps[];
  setOrders: React.Dispatch<React.SetStateAction<OrdersProps[]>>;
}

const Orders = ({ orders, setOrders }: OrdersComponentProps) => {
  useEffect(() => {
    const socket = socketIo("http://192.168.0.13:3001", {
      transports: ["websocket"],
    });

    socket.on("order@new", (order) => {
      setOrders((prev) => prev.concat(order));
    });

    return () => {
      socket.disconnect();
    };
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
