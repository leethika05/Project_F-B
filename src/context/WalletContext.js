import { createContext, useContext, useState } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(100); // Starting balance ₹100
  const [transactions, setTransactions] = useState([]);

  const addMoney = (amount) => {
    setBalance((prev) => prev + amount);
    const newTransaction = {
      id: transactions.length + 1,
      type: 'Credit',
      amount,
      time: new Date().toLocaleString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const payFine = (amount) => {
    if (balance >= amount) {
      setBalance((prev) => prev - amount);
      const newTransaction = {
        id: transactions.length + 1,
        type: 'Debit',
        amount,
        time: new Date().toLocaleString(),
      };
      setTransactions((prev) => [newTransaction, ...prev]);
      return true;
    }
    return false;
  };

  return (
    <WalletContext.Provider value={{ balance, transactions, addMoney, payFine }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
