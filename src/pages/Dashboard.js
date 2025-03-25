import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import Navbar from '../components/Navbar';
import './Dashboard.css';

const stations = [
  { id: 1, name: 'PRP', availableCycles: 5 },
  { id: 2, name: 'SJT', availableCycles: 3 },
  { id: 3, name: 'TT', availableCycles: 7 },
  { id: 4, name: 'SMV', availableCycles: 2 },
  { id: 5, name: 'CDMM', availableCycles: 4 },
  { id: 6, name: 'GDN', availableCycles: 6 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(100);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [message, setMessage] = useState('');
  const { addBooking } = useBooking();

  const restrictedPairs = [
    ['PRP', 'SJT'],
    ['SJT', 'TT'],
    ['SMV', 'CDMM'],
  ];

  const handleBooking = () => {
    if (source && destination) {
      if (restrictedPairs.some(pair => pair.includes(source) && pair.includes(destination))) {
        setMessage(`❌ Booking between ${source} and ${destination} is not allowed.`);
        return;
      }

      if (wallet >= 20) {
        setWallet(wallet - 20);
        addBooking(source, destination, 20);
        setMessage(`✅ Cycle booked from ${source} to ${destination} successfully!`);
        setSource('');
        setDestination('');
      } else {
        setMessage('⚠️ Insufficient balance.');
      }
    } else {
      setMessage('⚠️ Please select both source and destination.');
    }
  };

  return (
    <>
      <Navbar />

      {/* Wallet Button */}
      <div className="wallet-container">
        <button onClick={() => alert(`Current Balance: ₹${wallet}`)}>
          Wallet: ₹{wallet}
        </button>
      </div>

      <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard</h1>

        {/* Station List */}
        <div className="stations-list">
          {stations.map(station => (
            <div key={station.id} className="station-card">
              <h2>{station.name}</h2>
              <p>Available Cycles: {station.availableCycles}</p>
            </div>
          ))}
        </div>

        {/* Booking Form */}
        <div className="booking-form">
          <select value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="">Select Source</option>
            {stations.map(station => (
              <option key={station.id} value={station.name}>
                {station.name}
              </option>
            ))}
          </select>

          <select value={destination} onChange={(e) => setDestination(e.target.value)}>
            <option value="">Select Destination</option>
            {stations.map(station => (
              <option key={station.id} value={station.name}>
                {station.name}
              </option>
            ))}
          </select>

          <button onClick={handleBooking}>Book Now</button>
          {message && (
            <p className={message.includes('✅') ? 'success-message' : 'error-message'}>
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
