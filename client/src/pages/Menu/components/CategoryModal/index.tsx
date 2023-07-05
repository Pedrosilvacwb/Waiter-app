import { ModalBody } from "./styles";

import { useState, useEffect } from "react";
import { CategoryProps } from "../../../../types";
import FormGroup from "../../../../components/FormGroup";
import Input from "../../../../components/input";
import useErrors from "../../../../hooks/useErrors";
import Modal from "../../../../components/Modal";
import { api } from "../../../../utils/api";
import { toast } from "react-toastify";

interface CategoryModalProps {
  visible: boolean;
  isEdit: boolean;
  onClose: () => void;
  getCategories: () => void;
  selectedCategory: CategoryProps | undefined;
  setCategories: React.Dispatch<React.SetStateAction<CategoryProps[]>>;
}

const CategoryModal = ({
  visible,
  isEdit,
  onClose,
  getCategories,
  selectedCategory,
  setCategories,
}: CategoryModalProps) => {
  const [categoryForm, setCategoryForm] = useState<CategoryProps>({
    icon: "",
    name: "",
  });

  const { setError, removeError, getErrorMenssageByFieldName, errors } =
    useErrors();

  useEffect(() => {
    if (visible && selectedCategory) {
      setCategoryForm({
        icon: selectedCategory.icon,
        name: selectedCategory.name,
      });
    }
  }, [visible, selectedCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryForm((prev) => ({ ...prev, [name]: value }));

    if (!value) {
      setError({ field: name, message: "Campo obrigatório." });
    } else {
      removeError(name);
    }
  };

  const handleSubmit = () => {
    if (isEdit) {
      api
        .patch(`categories/${selectedCategory?._id}`, categoryForm)
        .then((res) => {
          toast.success("Categoria atualizada com sucesso!");
          getCategories();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Ocorreu um erro, por favor tente novamente");
        });
    } else {
      api
        .post("/categories", categoryForm)
        .then((res) => {
          toast.success("Categoria criada com sucesso!");
          getCategories();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Ocorreu um erro, por favor tente novamente");
        });
    }

    handleClose();
  };

  const handleClose = () => {
    setCategoryForm({
      icon: "",
      name: "",
    });
    onClose();
  };

  const handleDeleteCategory = () => {
    api.delete(`/categories/${selectedCategory?._id}`).then((res) => {
      setCategories((prev) =>
        prev.filter((category) => category._id !== selectedCategory?._id)
      );
      handleClose();
      toast.success("Categoria removida com sucesso!");
    });
  };

  const isFormValid =
    categoryForm.icon && categoryForm.name && errors.length === 0;

  if (!visible) return null;
  return (
    <Modal
      onCancel={handleDeleteCategory}
      actionDisabled={!isFormValid}
      visible={visible}
      onClose={handleClose}
      title={isEdit ? "Editar Categoria" : "Nova Categoria"}
      cancelLabel={isEdit && "Excluir Categoria"}
      actionLabel={isEdit ? "Atualizar Categoria" : "Cadastrar Categoria"}
      onAction={handleSubmit}
    >
      <ModalBody>
        <FormGroup htmlFor="icon" label="Emoji">
          <Input
            error={getErrorMenssageByFieldName("icon")}
            type="text"
            name="icon"
            placeholder="Ex: 🍕"
            value={categoryForm.icon}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup htmlFor="name" label="Nome da Categoria">
          <Input
            error={getErrorMenssageByFieldName("name")}
            type="text"
            name="name"
            placeholder="Pizza"
            value={categoryForm.name}
            onChange={handleChange}
          />
        </FormGroup>
      </ModalBody>
    </Modal>
  );
};

export default CategoryModal;
