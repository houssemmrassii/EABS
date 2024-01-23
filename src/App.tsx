import React from "react";
import { AuthProvider } from "./context/AuthContext";
import routes from "./routes";
import { GlobalProvider } from "./context/GlobalContext";
import { GroupEtablisementProvider } from "./context/GroupEtablissementContext";
import { EtablisementProvider } from "./context/EtablissementContext";
import { BrowserRouter as Router } from "react-router-dom";
import frFR from "antd/locale/fr_FR";
import { ConfigProvider } from "antd";
import { GroupClientProvider } from "./context/GroupClientContext";
import { ClientProvider } from "./context/ClientContext";
import { UserProvider } from "./context/UserContext";

const Routes = () => {
  return useRoutes(routes);
};

const App: React.FC = () => {
  return (
    <ConfigProvider locale={frFR}>
      <Router>
        <AuthProvider>
          <GlobalProvider>
            <GroupClientProvider>
              <GroupEtablisementProvider>
                <EtablisementProvider>
                  <UserProvider>
                    <ClientProvider>
                      <Routes />
                    </ClientProvider>
                  </UserProvider>
                </EtablisementProvider>
              </GroupEtablisementProvider>
            </GroupClientProvider>
          </GlobalProvider>
        </AuthProvider>
      </Router>
    </ConfigProvider>
  );
};

export default App;
