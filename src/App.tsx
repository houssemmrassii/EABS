import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Routes from "./routes";
import { GlobalProvider } from "./context/GlobalContext";
const App: React.FC = () => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <Routes />
      </GlobalProvider>
    </AuthProvider>
  );
};

export default App;
