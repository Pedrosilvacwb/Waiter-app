import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import {
  CategoriesContainer,
  Container,
  Footer,
  FooterContainer,
  MenuContainer,
  CenteredContainer,
} from "./styles";
import Header from "../components/Header";
import Categories from "../components/Categories";
import Menu from "../components/Menu";
import Button from "../components/Button";
import TableModal from "../components/TableModal";
import Cart from "../components/Cart";
import { CartItemProps, CategoryProps, ProductProps } from "../types";

import { Empty } from "../components/Icons/Empty";
import { Text } from "../components/Text";

import { api } from "../utils/api";

const Main = () => {
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loadingMenu, setLoadingMenu] = useState(false);

  useEffect(() => {
    Promise.all([api.get("/categories"), api.get("/products")])
      .then(([categories, products]) => {
        setCategories(categories.data);
        setProducts(products.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectCategory = async (categoryId: string) => {
    setLoadingMenu(true);
    const route = !categoryId
      ? "/products"
      : `/categories/${categoryId}/products`;
    const response = await api.get(route);
    setProducts(response.data);
    setLoadingMenu(false);
  };

  const handleSaveTable = (table: string) => {
    setSelectedTable(table);
  };

  const handleResetOrder = () => {
    setSelectedTable("");
    setCartItems([]);
  };

  const handleAddToCart = (product: ProductProps) => {
    if (!selectedTable) {
      setIsTableModalOpen(true);
    }
    setCartItems((prevState) => {
      const item = prevState.findIndex(
        (item) => item.product._id === product._id
      );

      if (item < 0) {
        return prevState.concat({ quantity: 1, product });
      }

      const newCartItems = [...prevState];
      newCartItems[item] = {
        ...newCartItems[item],
        quantity: newCartItems[item].quantity + 1,
      };

      return newCartItems;
    });
  };

  const handleDecrement = (product: ProductProps) => {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (item) => item.product._id === product._id
      );

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);
        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...newCartItems[itemIndex],
        quantity: newCartItems[itemIndex].quantity - 1,
      };

      return newCartItems;
    });
  };

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {loading && (
          <CenteredContainer>
            <ActivityIndicator size="large" color="#d73035" />
          </CenteredContainer>
        )}
        {!loading && (
          <>
            <CategoriesContainer>
              <Categories
                onSelectCategory={handleSelectCategory}
                categories={categories}
              />
            </CategoriesContainer>

            {loadingMenu ? (
              <CenteredContainer>
                <ActivityIndicator size="large" color="#d73035" />
              </CenteredContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <MenuContainer>
                    <Menu products={products} onAddToCart={handleAddToCart} />
                  </MenuContainer>
                ) : (
                  <CenteredContainer>
                    <Empty />
                    <Text color="#666" style={{ marginTop: 24 }}>
                      Nenhum produto foi encontrado!
                    </Text>
                  </CenteredContainer>
                )}
              </>
            )}
          </>
        )}
      </Container>
      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button
              disabled={loading}
              onPress={() => setIsTableModalOpen(true)}
            >
              Novo Pedido
            </Button>
          )}
          {selectedTable && (
            <Cart
              selectedTable={selectedTable}
              onAdd={handleAddToCart}
              onDecrement={handleDecrement}
              cartItem={cartItems}
              onConfirmOrder={handleResetOrder}
            />
          )}
        </FooterContainer>
      </Footer>
      <TableModal
        onSave={handleSaveTable}
        onClose={() => setIsTableModalOpen(false)}
        visible={isTableModalOpen}
      />
    </>
  );
};

export default Main;
