import { RouterProvider } from "react-router-dom";
import router from "./router";
import { AuthContext, useAuth } from "./hooks/UseAuth";

function App() {
  const value = useAuth();

  return (
    <AuthContext.Provider value={value}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
