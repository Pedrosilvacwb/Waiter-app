import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyles } from "./styles/GlobalStyles";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./Routes";
import { OrderProvider } from "./context/OrdersContext";

const App = () => {
  return (
    <>
      <OrderProvider>
        <BrowserRouter>
          <GlobalStyles />
          <AppRoutes />
          <ToastContainer position="bottom-center" />
        </BrowserRouter>
      </OrderProvider>
    </>
  );
};

export default App;
