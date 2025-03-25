import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import Navbar from '../components/Navbar';
import './Profile.css';

const Profile = () => {
  const { profile, updateProfile } = useProfile();
  const [name, setName] = useState(profile.name);
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');

  const handleSave = () => {
    if (!name || !password) {
      setSuccess('Please fill in all fields');
      return;
    }

    updateProfile({ ...profile, name, password });
    setSuccess('Profile updated successfully!');
    setPassword('');
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="profile-container">
        <h1 className="profile-title">My Profile</h1>

        <div className="profile-info">
          <div className="profile-pic">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
            />
          </div>
          <div className="profile-fields">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Email:</label>
            <input type="text" value={profile.email} disabled />

            <label>VIT ID:</label>
            <input type="text" value={profile.id} disabled />

            <label>New Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleSave}>Save Changes</button>

          {success && <p className="success-message">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
