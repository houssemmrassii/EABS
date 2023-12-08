// EtablissementContext.tsx
import React, { createContext, useContext, ReactNode, Key } from "react";

interface DataType {
  key: number;
  name: string;
  status: boolean;
}

// Define the shape of your authentication context
interface GroupEtablissementContextProps {
  tableData: DataType[] | undefined;
  addToTableData: (newData: DataType) => void;
  setTableData: React.Dispatch<React.SetStateAction<DataType[]>>;
  getRecord: (key: Key) => DataType | undefined;
  updateRecord: (key: Key, updatedData: DataType) => void
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
  const [tableData, setTableData] = React.useState<DataType[]>([]);

  const addToTableData = (newData: DataType) => {
    setTableData((prev) => [...prev, newData]);
  };
  const getRecord = (key: Key) => {
    return tableData.find((record) => record.key === key);
  };
  const updateRecord = (key: Key, updatedData: DataType) => {
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
  const contextValue: GroupEtablissementContextProps = {
    tableData,
    addToTableData,
    setTableData,
    getRecord,
    updateRecord,
  };

  return (
    <EtablissementContext.Provider value={contextValue}>
      {children}
    </EtablissementContext.Provider>
  );
};
