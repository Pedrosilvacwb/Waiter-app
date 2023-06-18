import { FlatList } from "react-native";

import { Text } from "../Text";
import { useState } from "react";

import { Product, Image, ProductDetails, Separator, AddButton } from "./styles";
import { formatCurrency } from "../../utils/FormatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import ProductModal from "../ProductModal";
import { ProductProps } from "../../types";

interface MenuProps {
  onAddToCart: (product: ProductProps) => void;
  products: ProductProps[];
}

const Menu = ({ onAddToCart, products }: MenuProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | ProductProps>(
    null
  );

  const handleOpenModal = (product: ProductProps) => {
    setIsModalVisible(true);
    setSelectedProduct(product);
  };

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
      <FlatList
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        data={products}
        ItemSeparatorComponent={Separator}
        keyExtractor={(product) => product._id}
        renderItem={({ item }) => (
          <Product onPress={() => handleOpenModal(item)}>
            <Image
              source={{
                uri: `http://192.168.0.12:3001/uploads/${item.imagePath}`,
              }}
            />
            <ProductDetails>
              <Text weight={600}>{item.name}</Text>
              <Text size={14} color={"#666"} style={{ marginVertical: 8 }}>
                {item.description}
              </Text>
              <Text weight={600} size={14}>
                {formatCurrency(item.price)}
              </Text>
            </ProductDetails>
            <AddButton onPress={() => onAddToCart(item)}>
              <PlusCircle />
            </AddButton>
          </Product>
        )}
      />
    </>
  );
};

export default Menu;
