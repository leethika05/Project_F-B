import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import './Booking.css';

const blocks = ['PRP', 'SJT', 'TT', 'SMV', 'CDMM', 'GDN'];

const restrictedPairs = [
  ['PRP', 'SJT'],
  ['SJT', 'TT'],
  ['SMV', 'CDMM'],
];

const Booking = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { addBooking } = useBooking();
  const navigate = useNavigate();

  const handleBooking = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (source && destination) {
      const isRestricted = restrictedPairs.some(
        (pair) => pair.includes(source) && pair.includes(destination)
      );

      if (isRestricted) {
        setError(`Booking between ${source} and ${destination} is not allowed.`);
      } else {
        const cost = 20;
        addBooking(source, destination, cost);
        setSuccess(`Cycle booked from ${source} to ${destination} successfully!`);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
        setSource('');
        setDestination('');
      }
    } else {
      setError('Please select both source and destination.');
    }
  };

  return (
    <div className="booking-container">
      <h1 className="booking-title">Book Your Cycle</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form className="booking-form" onSubmit={handleBooking}>
        <select value={source} onChange={(e) => setSource(e.target.value)} required>
          <option value="" disabled>Select Source</option>
          {blocks.map((block) => (
            <option key={block} value={block}>{block}</option>
          ))}
        </select>

        <select value={destination} onChange={(e) => setDestination(e.target.value)} required>
          <option value="" disabled>Select Destination</option>
          {blocks.map((block) => (
            <option key={block} value={block}>{block}</option>
          ))}
        </select>

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default Booking;
