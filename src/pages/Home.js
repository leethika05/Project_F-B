import React from 'react';
import './Home.css';
import LoginForm from '../components/LoginForm';

const Home = () => {
  return (
    <div className="home-container">
      <div className="overlay"></div>



      {/* New Title */}
      <div className="new-title-section">
        <h1 className="new-home-title">CYCLE BOOKING - VIT</h1>
        <p className="new-caption">Let’s be on time</p>
      </div>

      {/* Right Side Login Form */}
      <div className="login-section">
        <LoginForm />
      </div>
    </div>
  );
};

export default Home;
