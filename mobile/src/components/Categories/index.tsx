import { categories } from "../../mocks/categories";
import { Category, Icon } from "./styles";
import { Text } from "../Text";
import { FlatList } from "react-native";
import { useState } from "react";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);

  const handleSelectCategory = (id: string) => {
    const category = selectedCategory === id ? "" : id;
    setSelectedCategory(category);
  };

  return (
    <>
      <FlatList
        horizontal
        data={categories}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 24 }}
        keyExtractor={(category) => category._id}
        renderItem={({ item }) => {
          const isSelected = selectedCategory === item._id;

          return (
            <Category onPress={() => handleSelectCategory(item._id)}>
              <Icon>
                <Text opacity={isSelected ? 1 : 0.5}>{item.icon}</Text>
              </Icon>
              <Text size={14} weight={600} opacity={isSelected ? 1 : 0.5}>
                {item.name}
              </Text>
            </Category>
          );
        }}
      />
    </>
  );
};

export default Categories;
