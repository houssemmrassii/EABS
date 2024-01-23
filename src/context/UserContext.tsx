import React, { createContext, ReactNode, Key } from "react";

import { UserDataType } from "@/types";

// Define the shape of your authentication context
interface UserContextProps {
  tableData: UserDataType[] | undefined;
  addToTableData: (newData: UserDataType) => void;
  setTableData: React.Dispatch<React.SetStateAction<UserDataType[]>>;
  getRecord: (key: Key) => UserDataType | undefined;
  updateRecord: (key: Key, updatedData: UserDataType) => void;
}

// Create the context with an initial state
const UserContext = createContext<
  UserContextProps | undefined
>(undefined);

// Create a helper hook to access the context in your components
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used within an AuthProvider"
    );
  }
  return context;
};
interface GlobalProviderProps {
  children: ReactNode;
}
// Create a provider component to wrap your app with
export const UserProvider: React.FC<GlobalProviderProps> = ({
  children,
}) => {
  const [tableData, setTableData] = React.useState<UserDataType[]>([]);

  const addToTableData = (newData: UserDataType) => {
    setTableData((prev) => [...prev, newData]);
  };
  const getRecord = (key: Key) => {
    return tableData.find((record) => record.key === key);
  };
  const updateRecord = (key: Key, updatedData: UserDataType) => {
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
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
