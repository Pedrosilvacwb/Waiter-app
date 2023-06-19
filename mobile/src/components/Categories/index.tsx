import { Category, Icon } from "./styles";
import { Text } from "../Text";
import { FlatList } from "react-native";
import { useState } from "react";
import { CategoryProps } from "../../types";

interface CategoriesProps {
  categories: CategoryProps[];
  onSelectCategory: (categoryId: string) => Promise<void>;
}

const Categories = ({ categories, onSelectCategory }: CategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleSelectCategory = (id: string) => {
    const category = selectedCategory === id ? "" : id;

    onSelectCategory(category);
    setSelectedCategory(category);
  };

  return (
    <>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        contentContainerStyle={{ paddingRight: 24 }}
        keyExtractor={(category) => category._id}
        renderItem={({ item: category }) => {
          const isSelected = selectedCategory === category._id;

          return (
            <Category onPress={() => handleSelectCategory(category._id)}>
              <Icon>
                <Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
              </Icon>
              <Text size={14} weight={600} opacity={isSelected ? 1 : 0.5}>
                {category.name}
              </Text>
            </Category>
          );
        }}
      />
    </>
  );
};

export default Categories;
