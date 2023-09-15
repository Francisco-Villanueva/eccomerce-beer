import { useState, createContext } from "react";

// const initialState = {};
export const CheckoutContext = createContext();

export const CheckoutContextProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [payment,  setPayment] = useState([]);

  return (
    <CheckoutContext.Provider value={{ addresses, setAddresses, payment, setPayment }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;
