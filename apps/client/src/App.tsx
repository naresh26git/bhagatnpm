import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tooltip from "ui/Tooltip";
import { AuthContext, useAuth } from "./hooks/UseAuth";
import router from "./router";

function App() {
  const value = useAuth();

  return (
    <AuthContext.Provider value={value}>
      <Tooltip.Provider>
        <ToastContainer />
        <RouterProvider router={router} />
      </Tooltip.Provider>
    </AuthContext.Provider>
  );
}

export default App;
