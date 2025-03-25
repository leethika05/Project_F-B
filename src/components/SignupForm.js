import React, { useState } from 'react';
import './SignupForm.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // ✅ To handle redirection

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    console.log('Signup Data:', { name, email, password });
    alert('Signed Up Successfully!');

    // ✅ Redirect to home page after signup
    navigate('/');
  };

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="VIT Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          pattern=".*@vitstudent\.ac\.in"
          title="Please enter a valid VIT email ID"
        />

        {/* Password Field */}
        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)} className="toggle-password">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password Field */}
        <div className="password-field">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Re-Enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="toggle-password">
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Sign Up</button>

        <p>
          Already have an account?{' '}
          <span className="redirect-link" onClick={() => navigate('/')}>
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
