import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebase'; // Check the correct import path

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email.endsWith('@vitstudent.ac.in')) {
      setError('Please use your VIT student email ID.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset link sent to your email.');
      setError('');
      setTimeout(() => navigate('/'), 4000); // Redirect to login after 4s
    } catch (err) {
      console.error('Reset error:', err);
      setError('Failed to send reset email. Please try again.');
    }
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleReset}>
        <h2><b>Reset Password</b></h2>

        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            placeholder="VIT Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern=".*@vitstudent\.ac\.in"
            title="Please enter a valid VIT email ID"
          />
        </div>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <button type="submit">
          <FaPaperPlane /> <b>Send Reset Link</b>
        </button>

        <p onClick={() => navigate('/')}>
          <b>Back to Login</b>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
