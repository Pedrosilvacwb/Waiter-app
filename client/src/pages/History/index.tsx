import { useState, useEffect } from "react";

import LateralMenu from "../../components/LateralMenu";
import AppContainer from "../../components/AppContainer";
import Header from "../../components/Header";
import path from "../../assets/images/icons/interface/path.svg";
import OrdersTable from "./components/OrdersTable";
import { useContext } from "react";
import { SyncLoader } from "react-spinners";

import { OrderContext } from "../../context/OrdersContext";
import { Center } from "../../components/Center/styles";
import { api } from "../../utils/api";

const History = () => {
  const { isLoading } = useContext(OrderContext);
  const [categories, setCategories] = useState([]);
  const { finishedOrders, getOrders } = useContext(OrderContext);

  const getCategories = async () => {
    api.get("/categories").then((data) => setCategories(data.data));
  };

  useEffect(() => {
    getCategories();
    getOrders();
  }, []);

  return (
    <>
      <LateralMenu tabName="/historico" />
      <AppContainer>
        <Header
          icon={path}
          label="Visualize pedidos anteriores"
          page="Histórico"
        />
        {isLoading && (
          <Center>
            <SyncLoader color="#d73035" size={20} />
          </Center>
        )}
        {!isLoading && (
          <OrdersTable
            categories={categories}
            finishedOrders={finishedOrders}
          />
        )}
      </AppContainer>
    </>
  );
};

export default History;
