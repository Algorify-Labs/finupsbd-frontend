
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type CompareDataType = {
  ids: number[];
  dynamicData: any; // adjust the type as needed
};

type CompareContextType = {
  compareData: CompareDataType;
  setCompareData: (data: CompareDataType) => void;
};

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [compareData, setCompareData] = useState<CompareDataType>({
    ids: [],
    dynamicData: null,
  });

  return (
    <CompareContext.Provider value={{ compareData, setCompareData }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
};
