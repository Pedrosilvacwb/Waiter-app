import LateralMenu from "../../components/LateralMenu";
import AppContainer from "../../components/AppContainer";

import Orders from "./components/Orders";
import Header from "../../components/Header";
import home from "../../assets/images/icons/interface/home.svg";
import { useEffect, useState, useContext } from "react";
import { OrderContext } from "../../context/OrdersContext";
import RefreshModal from "./components/RefreshModal";
import { SyncLoader } from "react-spinners";
import { Center } from "../../components/Center/styles";

const Home = () => {
  const [isRefresModalOpen, setIsRefrehsModalOpen] = useState(false);

  const { getOrders, orders, setOrders, isLoading } = useContext(OrderContext);

  useEffect(() => {
    getOrders();
  }, []);

  const handleOpenRefreshModal = () => {
    setIsRefrehsModalOpen(true);
  };

  const handleCloseRefreshModal = () => {
    setIsRefrehsModalOpen(false);
  };

  return (
    <>
      <RefreshModal
        onClose={handleCloseRefreshModal}
        visible={isRefresModalOpen}
      />
      <LateralMenu tabName="/" />
      <AppContainer>
        <Header
          icon={home}
          isHome
          label="Acompanhe os pedidos do clientes"
          page="Home"
          onOpenModal={handleOpenRefreshModal}
        />
        {isLoading && (
          <Center>
            <SyncLoader color="#d73035" size={20} />
          </Center>
        )}
        {!isLoading && <Orders orders={orders} setOrders={setOrders} />}
      </AppContainer>
    </>
  );
};

export default Home;
