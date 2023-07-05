import Modal from "../../../../components/Modal";
import { CategoryProps } from "../../../../types";
import { api } from "../../../../utils/api";
import { Container } from "./styles";
import { toast } from "react-toastify";

interface RemoveCategoryModal {
  visible: boolean;
  onClose: () => void;
  selectedCategory: CategoryProps | undefined;
  setCategories: React.Dispatch<React.SetStateAction<CategoryProps[]>>;
}

const RemoveCategoryModal = ({
  onClose,
  visible,
  selectedCategory,
  setCategories,
}: RemoveCategoryModal) => {
  const handleDeleteCategory = () => {
    api.delete(`/categories/${selectedCategory?._id}`).then((res) => {
      setCategories((prev) =>
        prev.filter((category) => category._id !== selectedCategory?._id)
      );
      onClose();
      toast.success("Categoria removida com sucesso!");
    });
  };
  if (!visible) return null;
  return (
    <Modal
      title="Excluir Categoria"
      actionLabel="Excluir Categoria"
      onAction={handleDeleteCategory}
      onClose={onClose}
      cancelLabel="Manter categoria"
      visible={visible}
    >
      <Container>
        <span>Tem certeza que deseja excluir a categoria?</span>
        <span>
          {selectedCategory?.icon} {selectedCategory?.name}
        </span>{" "}
      </Container>
    </Modal>
  );
};

export default RemoveCategoryModal;
