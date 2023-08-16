import { RouterProvider } from "react-router-dom";
import { AuthContext, useAuth } from "./hooks/UseAuth";
import router from "./router";

function App() {
  const value = useAuth();

  return (
    <AuthContext.Provider value={value}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
