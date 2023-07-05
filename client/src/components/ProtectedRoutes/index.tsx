import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = window.localStorage.getItem("WAToken");

  return token ? (
    <>
      <Outlet />
    </>
  ) : (
    <>
      <Navigate to="/login" />
    </>
  );
};

export default ProtectedRoutes;
