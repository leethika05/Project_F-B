import React from 'react';
import './Home.css';
import LoginForm from '../components/LoginForm';

const Home = () => {
  return (

    <div className="home-container">
      <div className="overlay"></div>

      

      {/* Right Side Login Form */}
      <div className="login-section">
        <LoginForm />
      </div>
    </div>
  );
};

export default Home;
