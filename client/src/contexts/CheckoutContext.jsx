import axios from "axios";
import { useState, createContext } from "react";

// const initialState = {};
export const CheckoutContext = createContext();

export const CheckoutContextProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [payment,  setPayment] = useState([]);

  const checkOut = async (userId) => {
    try {
      const res = await axios.post(
        `http://localhost:4000/user/checkout/${userId}`
      );

      console.log("checkOut!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CheckoutContext.Provider value={{ addresses, setAddresses, payment, setPayment, checkOut }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;
