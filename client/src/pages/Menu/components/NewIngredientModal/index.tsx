import { useState } from "react";
import FormGroup from "../../../../components/FormGroup";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/input";
import { api } from "../../../../utils/api";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  getIngredients: () => void;
}

const NewIngredientModal = ({
  onClose,
  visible,
  getIngredients,
}: ModalProps) => {
  const [ingredientForm, setIngredientForm] = useState({
    icon: "",
    name: "",
  });
  const [errors, setErrors] = useState({
    icon: false,
    name: false,
  });
  const handleCreateIngredient = () => {
    if (!ingredientForm.icon) setErrors((prev) => ({ ...prev, icon: true }));
    if (!ingredientForm.name) setErrors((prev) => ({ ...prev, name: true }));
    if (!errors.icon && !errors.name) {
      api.post("/ingredients", ingredientForm).then((res) => {
        setIngredientForm({
          icon: "",
          name: "",
        });
        onClose();
        getIngredients();
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: false }));
    setIngredientForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setIngredientForm({
      icon: "",
      name: "",
    });
    onClose();
  };
  return (
    <Modal
      onClose={handleClose}
      visible={visible}
      title="Novo Ingrediente"
      actionLabel="Cadastrar Ingrediente"
      onAction={handleCreateIngredient}
    >
      <FormGroup htmlFor="icon" error={false} label="Emoji">
        <Input
          type="text"
          id="icon"
          name="icon"
          error={errors.icon}
          placeholder="Ex: 🍕"
          value={ingredientForm.icon}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup htmlFor="name" error={false} label="Nome do ingrediente">
        <Input
          type="text"
          id="name"
          name="name"
          error={errors.name}
          placeholder="Ex: Queijo Prato"
          onChange={handleChange}
          value={ingredientForm.name}
        />
      </FormGroup>
    </Modal>
  );
};

export default NewIngredientModal;
