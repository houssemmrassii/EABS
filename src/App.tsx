import React from "react";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import Routes from "./routes";
import { GlobalProvider } from "./context/GlobalContext/GlobalContext";
import { GroupEtablisementProvider } from "./context/GroupEtablissementContext/GroupEtablissementContext";
import { EtablisementProvider } from "./context/EtablissementContext/EtablissementContext";
const App: React.FC = () => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <GroupEtablisementProvider>
        <EtablisementProvider>
          <Routes />
        </EtablisementProvider>
        </GroupEtablisementProvider>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default App;
