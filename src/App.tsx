import React from "react";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import Routes from "./routes";
import { GlobalProvider } from "./context/GlobalContext/GlobalContext";
import { EtablisementProvider } from "./context/EtablissementContext/EtablissementContext";
const App: React.FC = () => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <EtablisementProvider>
          <Routes />
        </EtablisementProvider>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default App;
