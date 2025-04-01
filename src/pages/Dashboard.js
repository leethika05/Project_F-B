import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { useBooking } from '../context/BookingContext';
import Navbar from '../components/Navbar';
import './Dashboard.css';

const generateRandomCycles = () => Math.floor(Math.random() * (30 - 25 + 1)) + 25;

const stations = [
  { id: 1, name: 'PRP', availableCycles: generateRandomCycles() },
  { id: 2, name: 'SJT', availableCycles: generateRandomCycles() },
  { id: 3, name: 'TT', availableCycles: generateRandomCycles() },
  { id: 4, name: 'SMV', availableCycles: generateRandomCycles() },
  { id: 5, name: 'CDMM', availableCycles: generateRandomCycles() },
  { id: 6, name: 'GDN', availableCycles: generateRandomCycles() },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { balance, addMoney } = useWallet(); // Get balance from the wallet context
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [message, setMessage] = useState('');
  const [updatedStations, setUpdatedStations] = useState(stations);
  const { addBooking } = useBooking();

  const restrictedPairs = [
    ['PRP', 'SJT'],
    ['SJT', 'TT'],
    ['SMV', 'CDMM'],
    ['SMV', 'GDN'],
    ['CDMM', 'GDN'],
  ];

  const handleBooking = () => {
    if (source && destination) {
      if (restrictedPairs.some(pair => pair.includes(source) && pair.includes(destination))) {
        setMessage(`❌ Booking between ${source} and ${destination} is not allowed.`);
        return;
      }

      const sourceStation = updatedStations.find(station => station.name === source);
      
      if (sourceStation && sourceStation.availableCycles > 0) {
        if (balance >= 20) {
          addMoney(-20); // Deduct from balance after booking
          addBooking(source, destination, 20);

          const updatedSourceStation = { ...sourceStation, availableCycles: sourceStation.availableCycles - 1 };

          setUpdatedStations(prevStations =>
            prevStations.map(station =>
              station.name === source ? updatedSourceStation : station
            )
          );

          setMessage(`✅ Cycle booked from ${source} to ${destination} successfully!`);
          setSource('');
          setDestination('');
        } else {
          setMessage('⚠️ Insufficient balance.');
        }
      } else {
        setMessage('⚠️ No available cycles at the selected source station.');
      }
    } else {
      setMessage('⚠️ Please select both source and destination.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="wallet-container">
        <button onClick={() => alert(`Current Balance: ₹${balance}`)}>
          Wallet: ₹{balance}
        </button>
      </div>

      <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard</h1>

        <div className="stations-list">
          {updatedStations.map(station => (
            <div key={station.id} className="station-card">
              <h2>{station.name}</h2>
              <p>Available Cycles: {station.availableCycles}</p>
            </div>
          ))}
        </div>

        <div className="booking-form">
          <select value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="">Select Source</option>
            {updatedStations.map(station => (
              <option key={station.id} value={station.name}>
                {station.name}
              </option>
            ))}
          </select>

          <select value={destination} onChange={(e) => setDestination(e.target.value)}>
            <option value="">Select Destination</option>
            {updatedStations.map(station => (
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
