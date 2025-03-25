import React from 'react';
import { useBooking } from '../context/BookingContext';
import Layout from '../components/Layout';
import './BookingHistory.css';

const BookingHistory = () => {
  const { bookings } = useBooking();

  return (
    <Layout>
      <div className="history-container">
        <h1 className="history-title">Booking History</h1>
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Cost</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.source}</td>
                  <td>{booking.destination}</td>
                  <td>₹{booking.cost}</td>
                  <td>{booking.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default BookingHistory;
