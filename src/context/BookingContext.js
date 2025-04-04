// src/context/BookingContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { getAuth } from 'firebase/auth';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;

  // ✅ Add Booking to Firestore
  const addBooking = async (source, destination, cost) => {
    const user = auth.currentUser;
    if (!user) return;

    const booking = {
      source,
      destination,
      cost,
      time: new Date().toLocaleString(),
      userId: user.uid, // Needed for rules and filtering
    };

    await addDoc(collection(db, 'bookings'), booking);
  };

  // ✅ Listen for Firestore changes for current user
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userBookings = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookings(userBookings);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <BookingContext.Provider value={{ bookings, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
