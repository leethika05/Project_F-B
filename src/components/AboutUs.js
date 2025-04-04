import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Cycle Booking System</h1>
        <p>
          Welcome to the VIT Cycle Booking System — a smart, eco-friendly solution designed to make commuting across campus quick and hassle-free.
        </p>
        <p>
          Our platform allows students to book cycles between major blocks, unlock them with their VIT ID card, and ride safely to their destination. The entire system is integrated with Firebase for secure logins, real-time booking history, and a seamless wallet system.
        </p>
        <p>
          Enjoy up to 20 minutes of ride time for just ₹20, with emergency cycles available at each station for convenience. Experience smart mobility, now at your fingertips.
        </p>
        <h3>Built With 💻:</h3>
        <ul>
          <li>React.js (Frontend)</li>
          <li>Firebase Authentication & Firestore</li>
          <li>HTML, CSS, JavaScript & React-Js</li>
        </ul>
        <p className="footer-note">Created with ❤️ by Barath - VIT Vellore</p>
      </div>
    </div>
  );
};

export default AboutUs;
