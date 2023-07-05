import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { CartItemProps, ProductProps } from "../../types";
import {
  Actions,
  Item,
  ProductContainer,
  Image,
  QuantityContainer,
  ProductDetails,
  Summary,
  TotalContainer,
} from "./styles";
import { Text } from "../Text";
import { formatCurrency } from "../../utils/FormatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { MinusCircle } from "../Icons/MinusCircle";
import Button from "../Button";
import OrderConfirmedModal from "../OrderConfirmedModal";
import { api } from "../../utils/api";

interface CartProps {
  cartItem: CartItemProps[];
  onAdd: (product: ProductProps) => void;
  onDecrement: (product: ProductProps) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

const Cart = ({
  cartItem,
  onAdd,
  onDecrement,
  onConfirmOrder,
  selectedTable,
}: CartProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const total = cartItem.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0);

  const handleConfirmOrder = async () => {
    setLoading(true);
    const data = {
      table: selectedTable,
      products: cartItem.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
    };

    await api.post("/orders", data);
    setLoading(false);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    onConfirmOrder();
    setIsModalVisible(false);
  };
  const haveProducts = cartItem.length > 0;

  return (
    <>
      <OrderConfirmedModal onClose={handleOk} visible={isModalVisible} />
      {haveProducts && (
        <FlatList
          data={cartItem}
          keyExtractor={(item) => item.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.0.13:3001/uploads/${item.product.imagePath}`,
                  }}
                />

                <QuantityContainer>
                  <Text size={14} color="#666">
                    {item.quantity}X
                  </Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text size={14} weight="600">
                    {item.product.name}
                  </Text>
                  <Text size={14} color="#666" style={{ marginTop: 4 }}>
                    {formatCurrency(item.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity
                  style={{ marginRight: 24 }}
                  onPress={() => {
                    onAdd(item.product);
                  }}
                >
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDecrement(item.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {haveProducts ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button
          loading={loading}
          disabled={!haveProducts}
          onPress={handleConfirmOrder}
        >
          Confirmar Pedido
        </Button>
      </Summary>
    </>
  );
};

export default Cart;
