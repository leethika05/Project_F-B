import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navbar from '../components/Navbar';
import './BookingHistory.css';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("✅ Logged in as:", user.uid);
        try {
          const q = query(
            collection(db, 'bookings'),
            where('userId', '==', user.uid),
            orderBy('time', 'desc')
          );

          const querySnapshot = await getDocs(q);
          console.log("📦 Bookings found:", querySnapshot.docs.length);

          const userBookings = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              time: data.time?.toDate ? data.time.toDate() : null
            };
          });

          setBookings(userBookings);
        } catch (error) {
          console.error('❌ Error fetching bookings:', error);
        }
      } else {
        setBookings([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <div className="booking-history-container">
        <h1>Booking History</h1>
        {loading ? (
          <p>Loading...</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <ul>
            {bookings.map((booking) => (
              <li key={booking.id} className="booking-item">
                <strong>From:</strong> {booking.source} <strong>To:</strong> {booking.destination}<br />
                <strong>Cost:</strong> ₹{booking.cost} <br />
                <strong>Time:</strong> {booking.time?.toLocaleString() || 'N/A'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default BookingHistory;
