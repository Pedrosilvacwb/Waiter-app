import React from "react";
import { FlatList, Modal } from "react-native";
import { ProductProps } from "../../types";
import {
  Image,
  CloseBtn,
  Header,
  ModalBody,
  IngredientsContainer,
  Ingredient,
  Footer,
  FooterContainer,
  Price,
} from "./styles";
import { Close } from "../Icons/Close";
import { Text } from "../Text";
import { formatCurrency } from "../../utils/FormatCurrency";
import Button from "../Button";

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: ProductProps | null;
  onAddToCart: (product: ProductProps) => void;
}

const ProductModal = ({
  visible,
  onClose,
  product,
  onAddToCart,
}: ProductModalProps) => {
  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };
  return (
    <Modal
      onRequestClose={onClose}
      presentationStyle="pageSheet"
      animationType="slide"
      visible={visible}
    >
      <Image
        source={{
          uri: `http://192.168.0.13:3001/uploads/${product.imagePath}`,
        }}
      >
        <CloseBtn onPress={onClose}>
          <Close />
        </CloseBtn>
      </Image>
      <ModalBody>
        <Header>
          <Text size={24} weight="600">
            {product.name}
          </Text>
          <Text color="#666" style={{ marginTop: 8 }}>
            {product.description}
          </Text>
        </Header>

        {!!product.ingredients.length && (
          <IngredientsContainer>
            <Text weight="600" color="#666">
              Ingredientes
            </Text>

            <FlatList
              style={{ marginTop: 16 }}
              data={product.ingredients}
              keyExtractor={(ingredient) => ingredient._id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Ingredient>
                  <Text>{item.icon}</Text>
                  <Text size={14} color="#666">
                    {item.name}
                  </Text>
                </Ingredient>
              )}
            />
          </IngredientsContainer>
        )}
      </ModalBody>
      <Footer>
        <FooterContainer>
          <Price>
            <Text color="#666">Preço</Text>
            <Text size={20} weight="600">
              {formatCurrency(product.price)}
            </Text>
          </Price>
          <Button onPress={handleAddToCart}>Adicionar ao pedido</Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
};

export default ProductModal;
