import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase'; // Make sure this path is correct

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.endsWith('@vitstudent.ac.in')) {
      setError('Please use your VIT student email ID.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // alert('Logged in successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2><b>Login</b></h2>

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

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit">
          <FaSignInAlt /> <b>Login</b>
        </button>
        <p onClick={() => navigate('/signup')}>
          <b>Don't have an account? Sign up</b>
        </p>

        <p className="forgot-password" onClick={() => navigate('/forgot-password')}>
        <b>Forgot Password?</b>
      </p>

      </form>
    </div>
  );
};

export default LoginForm;
