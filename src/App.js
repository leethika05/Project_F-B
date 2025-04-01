import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { WalletProvider } from './context/WalletContext';
import { ProfileProvider } from './context/ProfileContext';
import Home from './pages/Home';
import Login from './components/LoginForm';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import BookingHistory from './pages/BookingHistory';
import ContactUs from './pages/ContactUs';
import Booking from './pages/Booking';
import AddMoneyUPI from './pages/AddMoneyUPI'; // Import new UPI page

const App = () => {
  return (
    <BookingProvider>
      <WalletProvider>
        <ProfileProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/booking-history" element={<BookingHistory />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/add-money-upi" element={<AddMoneyUPI />} />
            </Routes>
          </Router>
        </ProfileProvider>
      </WalletProvider>
    </BookingProvider>
  );
};

export default App;
