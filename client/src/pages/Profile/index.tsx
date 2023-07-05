import React from "react";
import LateralMenu from "../../components/LateralMenu";
import AppContainer from "../../components/AppContainer";
import Header from "../../components/Header";
import profile from "../../assets/images/icons/interface/profile.svg";

const Profile = () => {
  return (
    <div>
      <LateralMenu tabName="/perfil" />
      <AppContainer>
        <Header
          icon={profile}
          label="Gerencie suas informações pessoais"
          page="Meu Perfil"
        />
        <div>Perfil</div>
      </AppContainer>
    </div>
  );
};

export default Profile;
