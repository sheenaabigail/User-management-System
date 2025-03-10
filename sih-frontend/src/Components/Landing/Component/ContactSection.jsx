
import React, { useState } from 'react';
import './ContactSection.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send form data to a server)
    alert('Form submitted!');
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <section className="landing-contact-section-class" id="contact">
      <div className="landing-contact-form-container">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit} className="landing-contact-form-class">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="landing-contact-details">
        <p>Feel free to reach out to us for any inquiries or support.</p>
        <p>Email: <a href="mailto:info@example.com">echomindssih@example.com</a></p>
        <p>Phone: <a href="tel:+1234567890">+123 456 7890</a></p>
      </div>
    </section>
  );
};

export default ContactPage;

