import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import History from "./pages/History";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import ProtectedRoutes from "./components/ProtectedRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/historico" element={<History />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/usuarios" element={<Users />} />
        <Route path="/perfil" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
