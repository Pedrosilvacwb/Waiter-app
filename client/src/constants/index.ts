import home from "../assets/images/icons/interface/home.svg";
import menu from "../assets/images/icons/interface/menu.svg";
import users from "../assets/images/icons/interface/users.svg";
import profile from "../assets/images/icons/interface/profile.svg";
import logOff from "../assets/images/icons/interface/log-off.svg";
import path from "../assets/images/icons/interface/path.svg";

export const managementTabs = [
  {
    title: "Home",
    icon: home,
    tab: "/",
  },
  {
    title: "Histórico",
    icon: path,
    tab: "/historico",
  },
  {
    title: "Cardápio",
    icon: menu,
    tab: "/menu",
  },
  {
    title: "Usuários",
    icon: users,
    tab: "/usuarios",
  },
];

export const profileTabs = [
  {
    title: "Sair",
    icon: logOff,
    tab: "/login",
  },
];
