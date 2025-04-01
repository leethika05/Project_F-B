import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import Navbar from '../components/Navbar';
import './Wallet.css';

const Wallet = () => {
  const { balance, transactions, addMoney, payFine } = useWallet();
  const [amount, setAmount] = useState('');
  const [fineAmount, setFineAmount] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showConfirmation, setShowConfirmation] = useState(false); // state to show confirmation modal
  const [selectedFineAmount, setSelectedFineAmount] = useState(null); // store fine amount to be paid
  const navigate = useNavigate();

  const handleAddMoney = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setMessage({ type: 'error', text: 'Enter a valid amount to add.' });
      return;
    }
    navigate('/add-money-upi', { state: { amount: parseFloat(amount) } });
  };

  const handlePayFine = () => {
    if (!fineAmount || isNaN(fineAmount) || fineAmount <= 0) {
      setMessage({ type: 'error', text: 'Enter a valid fine amount.' });
      return;
    }

    // Show confirmation popup if the fine amount is valid
    setSelectedFineAmount(parseFloat(fineAmount));
    setShowConfirmation(true);
  };

  const confirmPayFine = () => {
    const paid = payFine(selectedFineAmount);
    if (paid) {
      setMessage({ type: 'success', text: `Fine of ₹${selectedFineAmount} paid successfully.` });
      setFineAmount('');
    } else {
      setMessage({ type: 'error', text: 'Insufficient balance.' });
    }
    setShowConfirmation(false); // Close the confirmation popup
  };

  const cancelPayFine = () => {
    setShowConfirmation(false); // Close the confirmation popup
  };

  return (
    <div
      className="dashboard-container"
      style={{
        backgroundImage: `url('../assets/wallet-bg.png')`,
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

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <h3>Confirm Fine Payment</h3>
            <p>Are you sure you want to pay ₹{selectedFineAmount} as fine?</p>
            <div className="modal-actions">
              <button onClick={confirmPayFine}>Yes, Pay</button>
              <button onClick={cancelPayFine}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
