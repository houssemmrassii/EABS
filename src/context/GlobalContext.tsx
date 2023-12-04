// GlobalContext.tsx
import { useSessionStorageState } from "ahooks";
import { IFuncUpdater } from "ahooks/lib/createUseStorageState";
import React, { createContext, useContext, ReactNode } from "react";

// Define the shape of your authentication context
interface GlobalContextProps {
  dashboardContent: string | undefined;
  setDashboardContent: (value?: string | IFuncUpdater<string> | undefined) => void;
}

// Create the context with an initial state
const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

// Create a helper hook to access the context in your components
export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within an AuthProvider");
  }
  return context;
};
interface GlobalProviderProps {
  children: ReactNode;
}
// Create a provider component to wrap your app with
export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [dashboardContent, setDashboardContent] =
    useSessionStorageState("DashboardContent",{
      "defaultValue":"Dashboard"
    });

  const contextValue: GlobalContextProps = {
    dashboardContent,
    setDashboardContent,
  };

  return (
    <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>
  );
};
