import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { FaEnvelope, FaLock, FaUserPlus, FaSignInAlt } from 'react-icons/fa';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.endsWith('@vitstudent.ac.in') && password.length >= 6) {
      alert(`${isSignup ? 'Signed Up' : 'Logged In'} Successfully!`);
      navigate('/dashboard');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>{isSignup ? <b>Sign Up</b> : <b>Login</b>}</h2>
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
        <button type="submit">
          {isSignup ? <><FaUserPlus /> <b>Sign Up</b></> : <><FaSignInAlt /> <b>Login</b></>}
        </button>

        {/* ✅ Link to signup page */}
        <p onClick={() => navigate('/signup')}>
          {isSignup
            ? <b>Already have an account? Login</b>
            : <b>Don't have an account? Sign up</b>}
        </p>

        {!isSignup && <p className="forgot-password"><b>Forgot Password?</b></p>}
      </form>
    </div>
  );
};

export default LoginForm;
