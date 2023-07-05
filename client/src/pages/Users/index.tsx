import { useEffect, useState } from "react";
import AppContainer from "../../components/AppContainer";
import Header from "../../components/Header";
import LateralMenu from "../../components/LateralMenu";
import usersImage from "../../assets/images/icons/interface/users.svg";
import TableHeader from "../../components/TableHeader";
import Table from "../../components/Table";
import edit from "../../assets/images/icons/interface/edit.svg";
import remove from "../../assets/images/icons/interface/remove.svg";
import RemoveUserModal from "./components/RemoveUserModal";
import UserModal from "./components/UserModal";
import { UserProps } from "../../types";
import { api } from "../../utils/api";
import { Center } from "../../components/Center/styles";
import { SyncLoader } from "react-spinners";

const headings = ["Nome", "Email", "Cargo", "Ações"];

const Users = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProps>();
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [chooseUser, setChooseUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getUsers = () => {
    setIsLoading(true);
    api
      .get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleCloseUserModal = () => {
    setOpenUserModal(false);
    setSelectedUser(undefined);
  };
  const handleCloseRemoveModal = () => {
    setSelectedUser(undefined);
    setOpenRemoveModal(false);
  };
  const handleOpenRemoveModal = (user: UserProps) => {
    setSelectedUser(user);
    setOpenRemoveModal(true);
  };

  const handleNewUserModal = () => {
    setChooseUser(true);
    setIsNew(true);
    setIsEdit(false);
    setOpenUserModal(true);
  };
  const handleEditUserModal = (user: UserProps) => {
    setChooseUser(true);
    setIsNew(false);
    setIsEdit(true);
    setOpenUserModal(true);
    setSelectedUser(user);
  };

  const tableData = users.map((user) => ({
    values: [user.name, user.email, user.type],
    actions: [
      { name: "Edit", icon: edit, action: () => handleEditUserModal(user) },
      {
        name: "Remove",
        icon: remove,
        action: () => handleOpenRemoveModal(user),
      },
    ],
  }));

  return (
    <div>
      <UserModal
        getUser={getUsers}
        onClose={handleCloseUserModal}
        isEdit={isEdit}
        chooseUserType={chooseUser}
        isNew={isNew}
        visible={openUserModal}
        selectedUser={selectedUser}
        setChooseUser={setChooseUser}
      />
      <RemoveUserModal
        onClose={handleCloseRemoveModal}
        visible={openRemoveModal}
        selectedUser={selectedUser}
        setUsers={setUsers}
      />
      <LateralMenu tabName="/usuarios" />
      <AppContainer>
        {isLoading && (
          <Center>
            <SyncLoader color="#d73035" size={20} />
          </Center>
        )}
        {!isLoading && (
          <>
            {" "}
            <Header
              icon={usersImage}
              label="Cadastre e gerencie seus usuários"
              page="Usuários"
            />
            <TableHeader
              label="Usuários"
              quantity={users.length}
              action
              actionLabel="Novo Usuário"
              onAction={handleNewUserModal}
            />
            <Table values={tableData} headings={headings} />
          </>
        )}
      </AppContainer>
    </div>
  );
};

export default Users;
