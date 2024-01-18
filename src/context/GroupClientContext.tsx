// ClientContext.tsx
import React, { createContext, useContext, ReactNode, Key } from "react";

import { GroupClientDataType } from "@/types";

// Define the shape of your authentication context
interface GroupClientContextProps {
  tableData: GroupClientDataType[] | undefined;
  addToTableData: (newData: GroupClientDataType) => void;
  setTableData: React.Dispatch<
    React.SetStateAction<GroupClientDataType[]>
  >;
  getRecord: (key: Key) => GroupClientDataType | undefined;
  updateRecord: (key: Key, updatedData: GroupClientDataType) => void;
}

// Create the context with an initial state
const ClientContext = createContext<
  GroupClientContextProps | undefined
>(undefined);

// Create a helper hook to access the context in your components
export const useGroupClientContext = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error(
      "useGroupClientContext must be used within an AuthProvider"
    );
  }
  return context;
};

interface GlobalProviderProps {
  children: ReactNode;
}
// Create a provider component to wrap your app with
export const GroupClientProvider: React.FC<GlobalProviderProps> = ({
  children,
}) => {
  const [tableData, setTableData] = React.useState<
    GroupClientDataType[]
  >([]);

  const addToTableData = (newData: GroupClientDataType) => {
    setTableData((prev) => [...prev, newData]);
  };
  const getRecord = (key: Key) => {
    return tableData.find((record) => record.key === key);
  };

  const updateRecord = (key: Key, updatedData: GroupClientDataType) => {
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

  const contextValue = React.useMemo(
    () => ({
      tableData,
      addToTableData,
      setTableData,
      getRecord,
      updateRecord,
    }),
    [tableData, addToTableData, setTableData, getRecord, updateRecord]
  );

  return (
    <ClientContext.Provider value={contextValue}>
      {children}
    </ClientContext.Provider>
  );
};
