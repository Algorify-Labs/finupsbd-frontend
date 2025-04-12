// // context/DataContext.js
// import { createContext, useState, Dispatch, SetStateAction } from 'react';




// interface DataContextType {
//   data: any;
//   setData: Dispatch<SetStateAction<any>>;
// }




// const DataContext = createContext<DataContextType | null>(null);

// export const DataProvider = ({ children }: {children: React.ReactNode}) => {
//   const [data, setData] = useState(null);

//   return (
//     <DataContext.Provider value={{ data, setData }}>
//       {children}
//     </DataContext.Provider>
//   );
// };

// export default DataContext;
