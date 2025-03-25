import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import Navbar from '../components/Navbar';
import './Wallet.css';

const Wallet = () => {
  const { balance, transactions, addMoney, payFine } = useWallet();
  const [amount, setAmount] = useState('');
  const [fineAmount, setFineAmount] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleAddMoney = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setMessage({ type: 'error', text: 'Enter a valid amount to add.' });
      return;
    }

    addMoney(parseFloat(amount));
    setMessage({ type: 'success', text: `₹${amount} added to your wallet.` });
    setAmount('');
  };

  const handlePayFine = () => {
    if (!fineAmount || isNaN(fineAmount) || fineAmount <= 0) {
      setMessage({ type: 'error', text: 'Enter a valid fine amount.' });
      return;
    }

    const paid = payFine(parseFloat(fineAmount));
    if (paid) {
      setMessage({ type: 'success', text: `Fine of ₹${fineAmount} paid successfully.` });
      setFineAmount('');
    } else {
      setMessage({ type: 'error', text: 'Insufficient balance.' });
    }
  };

  return (
    <div
      className="dashboard-container"
      style={{
        backgroundImage: `url('../assets/wallet-bg.png')`, // Change background here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <Navbar />
      <div className="wallet-container">
        <h1 className="wallet-title">Wallet</h1>
        <div className="balance-card">
          <p>Current Balance</p>
          <h2>₹{balance}</h2>
        </div>

        {/* Message Feedback */}
        {message.text && (
          <p className={message.type === 'error' ? 'error-message' : 'success-message'}>
            {message.text}
          </p>
        )}

        {/* Add Money Section */}
        <div className="wallet-actions">
          <input
            type="number"
            placeholder="Enter amount to add"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={handleAddMoney}>Add Money</button>
        </div>

        {/* Pay Fine Section */}
        <div className="wallet-actions">
          <input
            type="number"
            placeholder="Enter fine amount"
            value={fineAmount}
            onChange={(e) => setFineAmount(e.target.value)}
          />
          <button onClick={handlePayFine}>Pay Fine</button>
        </div>

        {/* Transaction History */}
        <h2>Transaction History</h2>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <ul className="transaction-list">
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                {transaction.type} - ₹{transaction.amount} on {transaction.time}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Wallet;
