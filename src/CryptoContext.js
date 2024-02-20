import React, { createContext, useContext, useState, useEffect } from 'react';

const Crypto = createContext();
const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  useEffect(() => {
    if (currency === 'INR') setSymbol("₹");
    if (currency === 'USD') setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const useCryptoState = () => { 
  return useContext(Crypto);
};
