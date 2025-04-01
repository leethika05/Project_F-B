import { createContext, useContext, useState } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(100); // Starting balance ₹100
  const [transactions, setTransactions] = useState([]);

  // Add money to the wallet
  const addMoney = (amount) => {
    // Update balance and transaction list atomically
    setBalance((prevBalance) => {
      const newBalance = prevBalance + amount;
      
      // Add a new transaction for the added money
      const newTransaction = {
        id: transactions.length + 1,
        type: 'Credit',
        amount,
        time: new Date().toLocaleString(),
      };
      setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);
      
      return newBalance; // Return the updated balance
    });
  };

  // Pay fine from the wallet
  const payFine = (amount) => {
    if (balance >= amount) {
      // Update balance and transaction list atomically
      setBalance((prevBalance) => {
        const newBalance = prevBalance - amount;

        // Add a new transaction for the fine payment
        const newTransaction = {
          id: transactions.length + 1,
          type: 'Debit',
          amount,
          time: new Date().toLocaleString(),
        };
        setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);

        return newBalance; // Return the updated balance
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
