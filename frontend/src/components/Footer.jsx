import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    e.target.reset();
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-about">
          <Link to="/" className="logo">
            <ShoppingBag className="logo-icon" size={24} />
            <span>Shop<span style={{ color: '#6366f1' }}>Now</span></span>
          </Link>
          <p>
            Experience premium shopping with our state-of-the-art e-commerce interface, backed by cutting-edge DevOps containerization and cluster automation.
          </p>
        </div>

        <div>
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/products" className="footer-link">Products</Link></li>
            <li><Link to="/about" className="footer-link">About Us</Link></li>
            <li><Link to="/contact" className="footer-link">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Support</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">FAQ</a></li>
            <li><a href="#" className="footer-link">Shipping Policy</a></li>
            <li><a href="#" className="footer-link">Returns & Refunds</a></li>
            <li><a href="#" className="footer-link">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4 className="footer-title">Newsletter</h4>
          <p>Subscribe to receive product updates and special promotional deals.</p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              className="newsletter-input"
              placeholder="Your email address"
              required
            />
            <button type="submit" className="newsletter-btn" aria-label="Subscribe">
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ShopNow. All rights reserved. Designed with love and CI/CD.</p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="#" aria-label="Github"><Github size={18} className="footer-link" /></a>
          <a href="#" aria-label="Twitter"><Twitter size={18} className="footer-link" /></a>
          <a href="#" aria-label="Linkedin"><Linkedin size={18} className="footer-link" /></a>
        </div>
      </div>
    </footer>
  );
}
