import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';



const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert('Logged out successfully!');
    navigate('/'); // ✅ Redirect to Home on logout
  };

  return (
    <nav className="navbar">
      <h2 className="nav-title">
        <img src="/cycle-logo.jpg" alt="Cycle Booking Logo" className="nav-logo" /> {/* ✅ Logo added */}
        <b></b>
      </h2>

      <ul className="nav-list">
        <li>
          <Link to="/dashboard" className="nav-link">🏠 Dashboard</Link>
        </li>
        <li>
          <Link to="/wallet" className="nav-link">💰 Wallet</Link>
        </li>
        <li>
          <Link to="/booking-history" className="nav-link">📅 Transaction History</Link>
        </li>
        <li>
          <Link to="/profile" className="nav-link">👤 Profile</Link>
        </li>
        <li>
          <Link to="/contactus" className="nav-link">☎ ContactUs</Link>
        </li>
        <li>
        <Link to="/about"  className="nav-link"> ℹ️ About Us</Link>
        </li>
      </ul>
      <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
    </nav>
  );
};

export default Navbar;
