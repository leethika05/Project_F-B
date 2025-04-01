import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWallet } from '../context/WalletContext'; // Import the wallet context
import './AddMoneyUPI.css';

const AddMoneyUPI = () => {
  const location = useLocation();
  const { amount } = location.state || { amount: 0 };
  const [upiId, setUpiId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { addMoney } = useWallet(); // Access the addMoney function from context

  const handleUPIPayment = () => {
    if (!upiId) {
      setPaymentStatus('Please enter a valid UPI ID.');
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('Processing payment...');

    // Simulate UPI payment success (you can replace this with actual API calls later)
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStatus('Payment successful! ₹' + amount + ' has been added to your wallet.');

      // Update wallet balance using the addMoney function from context
      addMoney(amount);

      setTimeout(() => {
        navigate('/wallet');  // Redirect to wallet after payment
      }, 2000); // Redirect after 2 seconds
    }, 3000); // Simulate a delay of 3 seconds for payment processing
  };

  return (
    <div className="upi-payment-container">
      <div className="upi-payment-card">
        <h1>Add Money via UPI</h1>
        <p>Amount to be added: ₹{amount}</p>
        
        <div className="upi-input-section">
          <input
            type="text"
            placeholder="Enter your UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
          <button onClick={handleUPIPayment} disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Pay with UPI'}
          </button>
        </div>

        {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
      </div>
    </div>
  );
};

export default AddMoneyUPI;
