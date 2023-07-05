import { useState, useEffect } from "react";
import LateralMenu from "../../components/LateralMenu";
import AppContainer from "../../components/AppContainer";
import Header from "../../components/Header";
import menu from "../../assets/images/icons/interface/menu.svg";
import TabSelector from "./components/TabSelector";
import ProductsTable from "./components/ProductsTable";
import CategoriesTable from "./components/CategoriesTable";
import { api } from "../../utils/api";
import { CategoryProps } from "../../types";
import { Center } from "../../components/Center/styles";
import { SyncLoader } from "react-spinners";

const Menu = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Produtos");
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleChangeTab = (tab: string) => {
    setSelectedTab(tab);
  };

  const getCategories = async () => {
    setIsLoading(true);
    await api.get("/categories").then((res) => setCategories(res.data));
  };

  useEffect(() => {
    getCategories().finally(() => setIsLoading(false));
  }, []);
  return (
    <div>
      <LateralMenu tabName="/menu" />
      <AppContainer>
        {isLoading && (
          <Center>
            <SyncLoader color="#d73035" size={20} />
          </Center>
        )}
        {!isLoading && (
          <>
            <Header
              icon={menu}
              label="Gerencie os produtos do seu estabelecimento"
              page="Cardápio"
            />
            <TabSelector
              onChangeTab={handleChangeTab}
              selectedTab={selectedTab}
            />
            {selectedTab === "Produtos" ? (
              <>
                <ProductsTable categories={categories} />
              </>
            ) : (
              <>
                <CategoriesTable
                  getCategories={getCategories}
                  setCategories={setCategories}
                  categories={categories}
                />
              </>
            )}
          </>
        )}
      </AppContainer>
    </div>
  );
};

export default Menu;
