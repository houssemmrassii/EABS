import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { ReservationDataType } from "@/types";

interface ReservationContextProps {
  tableData: ReservationDataType[] | undefined;
  addToTableData: (newData: ReservationDataType) => void;
  setTableData: React.Dispatch<React.SetStateAction<ReservationDataType[]>>;
  getRecord: (key: React.Key) => ReservationDataType | undefined;
  updateRecord: (key: React.Key, updatedData: ReservationDataType) => void;
}

const ReservationContext = createContext<ReservationContextProps | undefined>(undefined);

export const useReservationContext = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservationContext must be used within a ReservationProvider");
  }
  return context;
};

interface ReservationProviderProps {
  children: ReactNode;
}

export const ReservationProvider: React.FC<ReservationProviderProps> = ({ children }) => {
  const [tableData, setTableData] = useState<ReservationDataType[]>([]);

  const addToTableData = (newData: ReservationDataType) => {
    setTableData(prev => [...prev, newData]);
  };

  const getRecord = (key: React.Key) => {
    return tableData.find(record => record.key === key);
  };

  const updateRecord = (key: React.Key, updatedData: ReservationDataType) => {
    setTableData(prev => {
      const index = prev.findIndex(record => record.key === key);
      if (index !== -1) {
        const newTableData = [...prev];
        newTableData[index] = { ...newTableData[index], ...updatedData };
        return newTableData;
      }
      return prev;
    });
  };

  const contextValue = useMemo(() => ({
    tableData,
    addToTableData,
    setTableData,
    getRecord,
    updateRecord,
  }), [tableData]);

  return (
    <ReservationContext.Provider value={contextValue}>
      {children}
    </ReservationContext.Provider>
  );
};
