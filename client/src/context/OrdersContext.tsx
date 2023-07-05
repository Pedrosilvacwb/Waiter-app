import { createContext, useState } from "react";
import { OrdersProps } from "../types";
import { api } from "../utils/api";
import { toast } from "react-toastify";

interface OrderProviderProps {
  children: React.ReactNode;
}

interface OrderContextData {
  orders: OrdersProps[];
  finishedOrders: OrdersProps[];
  setFinishedOrders: React.Dispatch<React.SetStateAction<OrdersProps[]>>;
  setOrders: React.Dispatch<React.SetStateAction<OrdersProps[]>>;
  getOrders: () => void;
  deleteOrder: (selectedOrder: OrdersProps | null, isHistory?: boolean) => void;
  finishSelectedOrder: (selectedOrder: OrdersProps | null) => void;
  changeOrderStatus: (
    selectedOrder: OrdersProps | null,
    newStatus: string
  ) => void;
  fisnishAllOrders: () => void;
  isLoading: boolean;
}

export const OrderContext = createContext({} as OrderContextData);

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [orders, setOrders] = useState<OrdersProps[]>([]);
  const [finishedOrders, setFinishedOrders] = useState<OrdersProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getOrders = () => {
    setIsLoading(true);
    api
      .get("/orders")
      .then(({ data }) => {
        setOrders(data.filter((order: OrdersProps) => !order.finished));
        setFinishedOrders(data.filter((order: OrdersProps) => order.finished));
      })
      .finally(() => setIsLoading(false));
  };

  const deleteOrder = async (
    selectedOrder: OrdersProps | null,
    isHistory = false
  ) => {
    await api.delete(`/orders/${selectedOrder?._id}`);

    toast.success(
      `O pedido da mesa ${selectedOrder?.table} foi ${
        isHistory ? "removido" : "cancelado"
      }!`
    );
  };

  const changeOrderStatus = async (
    selectedOrder: OrdersProps | null,
    newStatus: string
  ) => {
    await api.patch(`orders/${selectedOrder?._id}`, { status: newStatus });
    toast.success(`O pedido da mesa ${selectedOrder?.table} foi alterado!`);
  };

  const finishSelectedOrder = async (selectedOrder: OrdersProps | null) => {
    await api.get(`orders/${selectedOrder?._id}/refresh`);
    getOrders();
    toast.success(`Pedido da mesa ${selectedOrder?.table} foi arquivado!`);
  };

  const fisnishAllOrders = async () => {
    if (!orders.length) {
      toast.error("Não existem pedidos para serem arquivados!");
    } else {
      await api.get("/orders/refresh");
      getOrders();
      toast.success("O dia foi reiniciado com sucesso!");
    }
  };

  return (
    <OrderContext.Provider
      value={{
        setFinishedOrders,
        finishedOrders,
        fisnishAllOrders,
        getOrders,
        orders,
        setOrders,
        changeOrderStatus,
        deleteOrder,
        finishSelectedOrder,
        isLoading,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
