import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navbar from '../components/Navbar';
import './BookingHistory.css';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getDatabase();
  const auth = getAuth();

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("✅ Logged in as:", user.uid);
        try {
          const userRef = ref(db, `users/${user.uid}/transactions`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const transactionsData = Object.entries(snapshot.val()).map(([id, data]) => ({
              id,
              ...data,
            }));

            setTransactions(transactionsData);
          } else {
            console.log("📦 No transactions found.");
            setTransactions([]);
          }
        } catch (error) {
          console.error('❌ Error fetching transactions:', error);
        }
      } else {
        setTransactions([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <div className="booking-history-container">
        <h1>Transaction History</h1>
        {loading ? (
          <p>Loading...</p>
        ) : transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction.id} className="booking-item">
                <strong>Transaction ID:</strong> {transaction.id} <br />
                <strong>Amount:</strong> ₹{transaction.amount} <br />
                <strong>Type:</strong> {transaction.type} <br />
                <strong>Time:</strong> {transaction.time}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default TransactionHistory;
