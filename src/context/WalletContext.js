import { createContext, useContext, useState } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(100); // Starting balance ₹100
  const [transactions, setTransactions] = useState([]);

  // Add money to the wallet
  const addMoney = (amount) => {
    setBalance((prevBalance) => {
      const newBalance = prevBalance + amount;
      const newTransaction = {
        id: transactions.length + 1,
        type: 'Credit',
        amount,
        time: new Date().toLocaleString(),
      };
      setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);
      return newBalance; // Update balance and return the new value
    });
  };

  // Pay fine from the wallet
  const payFine = (amount) => {
    if (balance >= amount) {
      setBalance((prevBalance) => {
        const newBalance = prevBalance - amount;
        const newTransaction = {
          id: transactions.length + 1,
          type: 'Debit',
          amount,
          time: new Date().toLocaleString(),
        };
        setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);
        return newBalance;
      });
      return true;
    }
    return false; // If balance is insufficient
  };

  return (
    <WalletContext.Provider value={{ balance, transactions, addMoney, payFine }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
