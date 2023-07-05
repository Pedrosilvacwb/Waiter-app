import Table from "../../../../components/Table";
import TableHeader from "../../../../components/TableHeader";
import edit from "../../../../assets/images/icons/interface/edit.svg";
import remove from "../../../../assets/images/icons/interface/remove.svg";
import RemoveCategoryModal from "../RemoveCategoryModal";
import { useState, useEffect } from "react";
import CategoryModal from "../CategoryModal";
import { CategoryProps } from "../../../../types";

const headings = ["Emoji", "Nome", "Ações"];

interface CategoriesTableProps {
  categories: CategoryProps[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryProps[]>>;
  getCategories: () => void;
}

const CategoriesTable = ({
  categories,
  setCategories,
  getCategories,
}: CategoriesTableProps) => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false);

  const [selectedCategory, setSelectedCategory] = useState<CategoryProps>();
  const [isCategoryModalOpen, setIsCategoryModalOpen] =
    useState<boolean>(false);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleOpenRemoveModal = (category: CategoryProps) => {
    setIsRemoveModalOpen(true);
    setSelectedCategory(category);
  };
  const handleCloseRemoveModal = () => {
    setIsRemoveModalOpen(false);
    setSelectedCategory(undefined);
  };
  const handleOpenCategoryModal = (category?: CategoryProps) => {
    setSelectedCategory(undefined);
    setIsCategoryModalOpen(true);
    if (category) {
      setSelectedCategory(category);
    }
  };
  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const handleIsEdit = (value: boolean) => {
    setIsEdit(value);
  };

  const tableData = categories.map((category) => ({
    values: [category.icon, category.name],
    actions: [
      {
        name: "Edit",
        icon: edit,
        action: () => {
          handleIsEdit(true);
          handleOpenCategoryModal(category);
        },
      },
      {
        name: "Remove",
        icon: remove,
        action: () => handleOpenRemoveModal(category),
      },
    ],
  }));

  return (
    <>
      <TableHeader
        label="Categorias"
        quantity={categories.length}
        action
        actionLabel="Nova Categoria"
        onAction={() => {
          handleIsEdit(false);
          handleOpenCategoryModal();
        }}
      />
      <Table values={tableData} headings={headings} />
      <RemoveCategoryModal
        onClose={handleCloseRemoveModal}
        visible={isRemoveModalOpen}
        selectedCategory={selectedCategory}
        setCategories={setCategories}
      />
      <CategoryModal
        selectedCategory={selectedCategory}
        getCategories={getCategories}
        onClose={handleCloseCategoryModal}
        visible={isCategoryModalOpen}
        isEdit={isEdit}
        setCategories={setCategories}
      />
    </>
  );
};

export default CategoriesTable;
