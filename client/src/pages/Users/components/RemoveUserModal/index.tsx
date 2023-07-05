import { ModalForm } from "./styles";

import Modal from "../../../../components/Modal";
import FormGroup from "../../../../components/FormGroup";
import Input from "../../../../components/input";
import { UserProps } from "../../../../types";
import { api } from "../../../../utils/api";
import { toast } from "react-toastify";

interface RemoveUserModalProps {
  visible: boolean;
  onClose: () => void;
  selectedUser: UserProps | undefined;
  setUsers: React.Dispatch<React.SetStateAction<UserProps[]>>;
}

const RemoveUserModal = ({
  visible,
  onClose,
  selectedUser,
  setUsers,
}: RemoveUserModalProps) => {
  const handleRemoveUser = () => {
    api.delete(`/users/${selectedUser?._id}`).then((res) => {
      setUsers((prev) => prev.filter((user) => user._id !== selectedUser?._id));
      onClose();
      toast.success("Usuário removido com sucesso!");
    });
  };

  return (
    <Modal
      onClose={onClose}
      visible={visible}
      title="Excluir usuário"
      cancelLabel="Manter Usuário"
      actionLabel="Excluir Usuário"
      onAction={handleRemoveUser}
    >
      <span>Tem certeza que deseja excluir esse usuário?</span>

      <ModalForm>
        <FormGroup error={false} label="Nome" htmlFor="name">
          <Input
            error={false}
            placeholder="Fulano de tal"
            name="name"
            type="text"
            id="name"
            value={selectedUser?.name}
            disabled
          />
        </FormGroup>
        <FormGroup error={false} label="E-mail" htmlFor="email">
          <Input
            error={false}
            placeholder="fulano@mail.com"
            type="email"
            id="email"
            value={selectedUser?.email}
            disabled
          />
        </FormGroup>
      </ModalForm>
    </Modal>
  );
};

export default RemoveUserModal;
