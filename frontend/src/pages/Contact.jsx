import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSuccess(false), 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1 className="gradient-text">Get in Touch</h1>
        <p>Have questions about the application or infrastructure? Drop us a line below.</p>
      </div>

      <div className="contact-grid">
        {/* Contact Details Column */}
        <div className="contact-info-list">
          <div className="contact-info-item">
            <div className="contact-info-icon">
              <Mail size={20} />
            </div>
            <div className="contact-info-details">
              <h3>Direct Email</h3>
              <p>support@shopnow.local</p>
              <p>devops-team@shopnow.local</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">
              <Phone size={20} />
            </div>
            <div className="contact-info-details">
              <h3>Phone Line</h3>
              <p>+1 (800) 555-0199</p>
              <p>Mon - Fri, 9am - 6pm EST</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">
              <MapPin size={20} />
            </div>
            <div className="contact-info-details">
              <h3>Headquarters</h3>
              <p>Cloud Center Building, Suite 404</p>
              <p>Silicon Valley, California</p>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <form className="contact-form glass-panel" onSubmit={handleSubmit}>
          <h2 className="form-title">Send a Message</h2>
          
          {success && (
            <div className="form-alert-success">
              Message sent successfully! We will get back to you soon.
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject" className="form-label">Subject</label>
            <input
              type="text"
              id="subject"
              className="form-input"
              placeholder="Inquiry or Feedback"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">Your Message</label>
            <textarea
              id="message"
              className="form-textarea"
              placeholder="Type your message here..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn-primary btn-submit">
            <Send size={16} /> Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
