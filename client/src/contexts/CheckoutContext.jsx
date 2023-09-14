import { useState, createContext } from "react";

// const initialState = {};
export const CheckoutContext = createContext();

export const CheckoutContextProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);

  return (
    <CheckoutContext.Provider value={{ addresses, setAddresses }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;
