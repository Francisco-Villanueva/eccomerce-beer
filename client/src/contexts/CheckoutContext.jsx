import { useState, createContext } from "react";

// const initialState = {};
export const AddressContext = createContext();

const CheckoutContextProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);


  return (
    <AddressContext.Provider value={{ addresses, setAddresses }}>
      {children}
    </AddressContext.Provider>
  );
};

export default CheckoutContextProvider;