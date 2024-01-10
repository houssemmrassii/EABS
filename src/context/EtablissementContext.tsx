import React, { createContext, ReactNode, Key } from "react";

import { EtablissementDataType } from "@/types";

// Define the shape of your authentication context
interface EtablissementContextProps {
  tableData: EtablissementDataType[] | undefined;
  addToTableData: (newData: EtablissementDataType) => void;
  setTableData: React.Dispatch<React.SetStateAction<EtablissementDataType[]>>;
  getRecord: (key: Key) => EtablissementDataType | undefined;
  updateRecord: (key: Key, updatedData: EtablissementDataType) => void;
}

// Create the context with an initial state
const EtablissementContext = createContext<
  EtablissementContextProps | undefined
>(undefined);

// Create a helper hook to access the context in your components
export const useEtablissementContext = () => {
  const context = useContext(EtablissementContext);
  if (!context) {
    throw new Error(
      "useEtablissementContext must be used within an AuthProvider"
    );
  }
  return context;
};
interface GlobalProviderProps {
  children: ReactNode;
}
// Create a provider component to wrap your app with
export const EtablisementProvider: React.FC<GlobalProviderProps> = ({
  children,
}) => {
  const [tableData, setTableData] = React.useState<EtablissementDataType[]>([]);

  const addToTableData = (newData: EtablissementDataType) => {
    setTableData((prev) => [...prev, newData]);
  };
  const getRecord = (key: Key) => {
    return tableData.find((record) => record.key === key);
  };
  const updateRecord = (key: Key, updatedData: EtablissementDataType) => {
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
    <EtablissementContext.Provider value={contextValue}>
      {children}
    </EtablissementContext.Provider>
  );
};
