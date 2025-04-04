import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './ContactUs.css';
import Navbar from '../components/Navbar';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName || '');
        setEmail(user.email || '');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!name || !email || !message) {
      setStatus('⚠️ Please fill in all fields!');
      return;
    }
  
    const subject = `Contact from ${name}`;
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
  
    const mailtoLink = `mailto:sbarath2704@gmail.com?subject=${subject}&body=${body}`;
  
    window.location.href = mailtoLink;
    setStatus('✅ Opening your mail client...');
  };
  

  return (
    <div>
      <Navbar />
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <div className="contact-details">
          <p><strong>Email:</strong> sbarath2704@gmail.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            readOnly
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            readOnly
          />
          <textarea
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send Message</button>
          {status && <p className="status-message">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
