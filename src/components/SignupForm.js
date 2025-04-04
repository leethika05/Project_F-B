import React, { useState } from 'react';
import './SignupForm.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name in auth profile
      await updateProfile(user, { displayName: name });

      // Save user info in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        studentId,
        email,
        profilePic: '' // default blank, can update later in profile
      });

      alert('Signed up successfully!');
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Student ID (e.g., 23BCE2021)" value={studentId} onChange={(e) => setStudentId(e.target.value)} pattern="\d{2}[A-Z]{3}\d{4}" title="Format: 23BCE2021" required />
      
      <input type="email" placeholder="VIT Email ID" value={email} onChange={(e) => setEmail(e.target.value)} required pattern=".*@vitstudent\.ac\.in" title="Please enter a valid VIT email ID" />

      <div className="password-field">
        <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <span onClick={() => setShowPassword(!showPassword)} className="toggle-password">{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
      </div>

      <div className="password-field">
        <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Re-Enter Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="toggle-password">{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
      </div>

      {error && <p className="error-message">{error}</p>}
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
