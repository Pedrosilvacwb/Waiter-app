import { useState } from "react";
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
import { CartItemProps, ProductProps } from "../types";
import { products as MockProducts } from "../mocks/products";
import { Empty } from "../components/Icons/Empty";
import { Text } from "../components/Text";

const Main = () => {
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductProps[]>(MockProducts);

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
              <Categories />
            </CategoriesContainer>
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
