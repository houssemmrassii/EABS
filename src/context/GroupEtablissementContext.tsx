// EtablissementContext.tsx
import React, { createContext, useContext, ReactNode, Key } from "react";

import { GroupEtablissementDataType } from "@/types";

// Define the shape of your authentication context
interface GroupEtablissementContextProps {
  tableData: GroupEtablissementDataType[] | undefined;
  addToTableData: (newData: GroupEtablissementDataType) => void;
  setTableData: React.Dispatch<
    React.SetStateAction<GroupEtablissementDataType[]>
  >;
  getRecord: (key: Key) => GroupEtablissementDataType | undefined;
  updateRecord: (key: Key, updatedData: GroupEtablissementDataType) => void;
}

// Create the context with an initial state
const EtablissementContext = createContext<
  GroupEtablissementContextProps | undefined
>(undefined);

// Create a helper hook to access the context in your components
export const useGroupEtablissementContext = () => {
  const context = useContext(EtablissementContext);
  if (!context) {
    throw new Error(
      "useGroupEtablissementContext must be used within an AuthProvider"
    );
  }
  return context;
};

interface GlobalProviderProps {
  children: ReactNode;
}
// Create a provider component to wrap your app with
export const GroupEtablisementProvider: React.FC<GlobalProviderProps> = ({
  children,
}) => {
  const [tableData, setTableData] = React.useState<
    GroupEtablissementDataType[]
  >([]);

  const addToTableData = (newData: GroupEtablissementDataType) => {
    setTableData((prev) => [...prev, newData]);
  };
  const getRecord = (key: Key) => {
    return tableData.find((record) => record.key === key);
  };

  const updateRecord = (key: Key, updatedData: GroupEtablissementDataType) => {
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
    <EtablissementContext.Provider value={contextValue}>
      {children}
    </EtablissementContext.Provider>
  );
};
