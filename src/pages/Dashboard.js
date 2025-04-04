import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import Navbar from '../components/Navbar';
import './Dashboard.css';

const stations = [
  { id: 1, name: 'PRP' },
  { id: 2, name: 'SJT' },
  { id: 3, name: 'TT' },
  { id: 4, name: 'SMV' },
  { id: 5, name: 'MB' },
  { id: 6, name: 'CDMM' },
  { id: 7, name: 'GDN' },
];

const fareChart = {
  PRP: { SJT: 10, TT: 25, SMV: 30, MB: 35, CDMM: 45, GDN: 50 },
  SJT: { TT: 10, SMV: 20, MB: 25, CDMM: 35, GDN: 45 },
  TT: { SMV: 10, MB: 20, CDMM: 30, GDN: 40 },
  SMV: { MB: 10, CDMM: 20, GDN: 30 },
  MB: { CDMM: 10, GDN: 20 },
  CDMM: { GDN: 10 },
};

const Dashboard = () => {
  const { balance } = useWallet();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [fare, setFare] = useState(null);
  const [message, setMessage] = useState('');

  const checkFare = () => {
    if (source === destination) {
      setMessage('❌ Source and destination cannot be the same.');
      setFare(null);
      return;
    }
    setMessage('');
    const price = fareChart[source]?.[destination] || fareChart[destination]?.[source] || 'N/A';
    setFare(price);
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

          <button onClick={checkFare}>Check Fare</button>

          {message && <p className="error-message">{message}</p>}
          {fare !== null && !message && (
            <p className="success-message">Estimated Fare: ₹{fare}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
