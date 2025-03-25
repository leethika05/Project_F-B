import React, { useState } from 'react';
import './ContactUs.css';
import Navbar from '../components/Navbar'; // ✅ Import Navbar

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setStatus('Please fill in all fields!');
      return;
    }

    setTimeout(() => {
      setStatus('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <div>
      {/* ✅ Keep Navbar fixed at top */}
      <Navbar /> 

      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        
        <div className="contact-details">
          <p><strong>Email:</strong> support@vitcycle.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
