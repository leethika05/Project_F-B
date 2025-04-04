import React, { useEffect, useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import Navbar from '../components/Navbar';
import './Profile.css';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updateProfile as updateAuthProfile } from 'firebase/auth';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';

const Profile = () => {
  const { profile, updateProfile } = useProfile();

  // States for profile data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [profilePic, setProfilePic] = useState('');

  // States for editing & image cropping
  const [editMode, setEditMode] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState('');
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  // Load profile from Firestore
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setName(data.name || '');
            setEmail(data.email || '');
            setStudentId(data.studentId || '');
            setProfilePic(data.profilePic || '');
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Crop complete callback
  const onCropComplete = (_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  // Generate cropped image from selected input
  const showCroppedImage = async () => {
    try {
      const cropped = await getCroppedImg(image, croppedAreaPixels);
      setCroppedImage(cropped);
      setNewProfilePic(cropped);
    } catch (error) {
      console.error('Cropping failed:', error);
    }
  };

  // Save updated profile info
  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const updatedData = {
        name,
        studentId,
        profilePic: newProfilePic || profilePic,
      };

      await updateDoc(doc(db, 'users', user.uid), updatedData);
      await updateAuthProfile(user, { displayName: name });

      setProfilePic(newProfilePic || profilePic);
      setNewProfilePic('');
      setSuccess('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setSuccess('Error updating profile.');
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditMode(false);
    setNewProfilePic('');
    setImage(null);
    setCroppedImage(null);
    setSuccess('');
  };

  // File input change handler
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setImage(reader.result);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="dashboard-container">
        <Navbar />
        <p>Loading...</p>
      </div>
    );
  }

  // Main JSX
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="profile-container">
        <h1 className="profile-title">My Profile</h1>

        <div className="profile-info">
          <div className="profile-pic">
            <img
              src={
                croppedImage ||
                newProfilePic ||
                profilePic ||
                'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
              }
              alt="Profile"
            />
            {editMode && (
              <>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {image && (
                  <div className="crop-container">
                    <Cropper
                      image={image}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      cropShape="round"
                      showGrid={false}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                    <button onClick={showCroppedImage}>Crop Image</button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="profile-fields">
            <label>Name:</label>
            {editMode ? (
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            ) : (
              <p>{name}</p>
            )}

            <label>Email:</label>
            <input type="text" value={email} disabled />

            <label>VIT ID:</label>
            <input type="text" value={studentId} disabled />
          </div>

          {editMode ? (
            <div className="edit-actions">
              <button onClick={handleSave}>Save Changes</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => setEditMode(true)}>Edit Profile</button>
          )}

          {success && <p className="success-message">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
