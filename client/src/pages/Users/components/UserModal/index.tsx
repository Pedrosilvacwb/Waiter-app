import { ModalForm } from "./styles";

import Modal from "../../../../components/Modal";
import FormGroup from "../../../../components/FormGroup";
import Input from "../../../../components/input";
import { UserProps } from "../../../../types";
import { useEffect, useState } from "react";
import { api } from "../../../../utils/api";
import { toast } from "react-toastify";
import useErrors from "../../../../hooks/useErrors";
import isEmailValid from "../../../../utils/isEmailValid";

interface UserModalProps {
  onClose: () => void;
  visible: boolean;
  chooseUserType?: boolean;
  isEdit?: boolean;
  isNew?: boolean;
  selectedUser?: UserProps | undefined;

  setChooseUser: React.Dispatch<React.SetStateAction<boolean>>;
  getUser: () => void;
}

const UserModal = ({
  onClose,
  visible,
  chooseUserType,
  isEdit,
  isNew,
  selectedUser,
  getUser,
  setChooseUser,
}: UserModalProps) => {
  const [userForm, setUserForm] = useState<UserProps>({
    name: "",
    email: "",
    password: "",
    type: "",
  });

  const { setError, removeError, getErrorMenssageByFieldName, errors } =
    useErrors();

  useEffect(() => {
    if (visible && selectedUser) {
      setUserForm({
        email: selectedUser.email,
        name: selectedUser.name,
        type: selectedUser.type,
        password: selectedUser.password,
      });
    }
    const id = window.localStorage.getItem("WAUserId");

    setChooseUser(id === selectedUser?._id ? false : true);
  }, [visible, selectedUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
    if (!value) {
      setError({ field: name, message: "Campo obrigatório." });
    } else {
      removeError(name);
    }
  };

  const handleSubmit = () => {
    if (!isEmailValid(userForm.email)) {
      return setError({ field: "email", message: "Campo obrigatório." });
    }

    if (selectedUser && isEdit) {
      api.patch(`/users/${selectedUser._id}`, userForm).then((res) => {
        getUser();

        toast.success("Novo usuário cadastrado com sucesso!");
        handleClose();
      });
    } else {
      api.post("users", userForm).then((res) => {
        getUser();

        toast.success("Novo usuário cadastrado com sucesso!");
        handleClose();
      });
    }
  };

  const handleClose = () => {
    setUserForm({
      name: "",
      email: "",
      password: "",
      type: "",
    });
    onClose();
  };
  const isFormValid =
    userForm.email &&
    userForm.name &&
    userForm.password &&
    userForm.type &&
    errors.length === 0;
  return (
    <Modal
      visible={visible}
      title={isEdit ? "Editar Usuário" : "Novo Usuário"}
      actionLabel={isEdit ? "Salvar Alterações" : "Cadastrar Usuário"}
      cancelLabel={chooseUserType && !isNew && "Excluir Usuário"}
      onClose={handleClose}
      onAction={handleSubmit}
      actionDisabled={!isFormValid}
    >
      <ModalForm>
        <FormGroup htmlFor="name" label="Name">
          <Input
            onChange={handleChange}
            error={getErrorMenssageByFieldName("name")}
            placeholder="Fulano de tal"
            name="name"
            id="name"
            type="text"
            value={userForm.name}
          />
        </FormGroup>
        <FormGroup htmlFor="email" label="Email">
          <Input
            onChange={handleChange}
            name="email"
            value={userForm.email}
            error={getErrorMenssageByFieldName("email")}
            id="email"
            placeholder="fulano@mail.com"
            type="email"
          />
        </FormGroup>
        <FormGroup htmlFor="password" label="Senha">
          <Input
            onChange={handleChange}
            name="password"
            id="password"
            value={userForm.password}
            error={getErrorMenssageByFieldName("password")}
            placeholder="***"
            type="password"
          />
        </FormGroup>

        {chooseUserType && (
          <div className="radio-input">
            <label htmlFor="">Tipo</label>
            <div className="radio-container">
              <div>
                <input
                  onChange={handleChange}
                  value={"Admin"}
                  name="type"
                  type="radio"
                  checked={userForm.type === "Admin"}
                />
                <label htmlFor="type">Admin</label>
              </div>
              <div>
                <input
                  onChange={handleChange}
                  value={"Waiter"}
                  name="type"
                  type="radio"
                  checked={userForm.type === "Waiter"}
                />
                <label htmlFor="type">Garçom</label>
              </div>
            </div>
          </div>
        )}
      </ModalForm>
    </Modal>
  );
};

export default UserModal;
