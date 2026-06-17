import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Zap, ShoppingCart } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/data/products.json')
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 4)))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Discover the <br />
            <span className="accent-text">Premium Std</span> <br />
            of Shopping.
          </h1>
          <p className="hero-description">
            ShopNow introduces a hand-curated selection of premium accessories, apparel, electronics, and smart home items built with exceptional craftsmanship.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn-primary">
              Shop Collection <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
        <div className="hero-image-container">
          <div className="hero-glow"></div>
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80"
            alt="Premium Products Display"
            className="hero-img"
          />
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card glass-panel">
            <div className="feature-icon-wrapper">
              <Truck size={24} />
            </div>
            <h3>Free Express Shipping</h3>
            <p>Complimentary expedited shipping on all orders over $150, fully insured.</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon-wrapper">
              <ShieldCheck size={24} />
            </div>
            <h3>Secured Checkout</h3>
            <p>Our secure system uses advanced 256-bit encryption for safe processing.</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon-wrapper">
              <Zap size={24} />
            </div>
            <h3>Premium Support</h3>
            <p>Access our customer satisfaction response agents 24 hours a day, 7 days a week.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="section-header">
          <div>
            <h2 className="gradient-text">Featured Highlights</h2>
            <p style={{ color: '#9ca3af', marginTop: '4px' }}>Handpicked essentials chosen for your daily lifestyle.</p>
          </div>
          <Link to="/products" className="view-all-link">
            View All Collection <ArrowRight size={16} />
          </Link>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
