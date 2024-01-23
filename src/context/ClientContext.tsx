import React, { createContext, ReactNode, Key } from "react";

import { ClientDataType } from "@/types";

// Define the shape of your authentication context
interface ClientContextProps {
  tableData: ClientDataType[] | undefined;
  addToTableData: (newData: ClientDataType) => void;
  setTableData: React.Dispatch<React.SetStateAction<ClientDataType[]>>;
  getRecord: (key: Key) => ClientDataType | undefined;
  updateRecord: (key: Key, updatedData: ClientDataType) => void;
}

// Create the context with an initial state
const ClientContext = createContext<
  ClientContextProps | undefined
>(undefined);

// Create a helper hook to access the context in your components
export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error(
      "useClientContext must be used within an AuthProvider"
    );
  }
  return context;
};
interface GlobalProviderProps {
  children: ReactNode;
}
// Create a provider component to wrap your app with
export const ClientProvider: React.FC<GlobalProviderProps> = ({
  children,
}) => {
  const [tableData, setTableData] = React.useState<ClientDataType[]>([]);

  const addToTableData = (newData: ClientDataType) => {
    setTableData((prev) => [...prev, newData]);
  };
  const getRecord = (key: Key) => {
    return tableData.find((record) => record.key === key);
  };
  const updateRecord = (key: Key, updatedData: ClientDataType) => {
    setTableData((prev) => {
      const index = prev.findIndex((record) => record.key === key);
      if (index !== -1) {
        const newTableData = [...prev];
        newTableData[index] = { ...newTableData[index], ...updatedData };
        return newTableData;
      }
      return prev;
    });
  };
  const contextValue = React.useMemo(() => {
    return {
      tableData,
      addToTableData,
      setTableData,
      getRecord,
      updateRecord,
    };
  }, [tableData, addToTableData, setTableData, getRecord, updateRecord]);

  return (
    <ClientContext.Provider value={contextValue}>
      {children}
    </ClientContext.Provider>
  );
};
