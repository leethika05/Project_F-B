import React from 'react';
import './Home.css';
import LoginForm from '../components/LoginForm';

const Home = () => {
  return (
    <div className="home-container">
      <div className="overlay"></div>
      
      {/* Title Section */}
      <div className="title-section">
        <h1 className="home-title">VIT Cycle Booking</h1>
      </div>

      {/* Right Side Login Form */}
      <div className="login-section">
        <LoginForm />
      </div>
    </div>
  );
};

export default Home;