import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  const addBooking = (source, destination, cost) => {
    const newBooking = {
      id: bookings.length + 1,
      source,
      destination,
      cost,
      time: new Date().toLocaleString(),
    };

    setBookings((prevBookings) => [...prevBookings, newBooking]);
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
