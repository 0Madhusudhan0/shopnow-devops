import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/products/${product.id}`} className="product-card glass-panel">
      <div className="product-card-img-wrapper">
        <img src={product.image} alt={product.name} className="product-card-img" loading="lazy" />
        <span className="product-card-badge">{product.category}</span>
      </div>
      <div className="product-card-content">
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-description">{product.description}</p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
          <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#fbbf24' }}>{product.rating}</span>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>({product.reviews})</span>
        </div>

        <div className="product-card-footer">
          <span className="product-card-price">${product.price.toFixed(2)}</span>
          <button className="btn-card-add" onClick={handleAdd} aria-label="Add to cart">
            <Plus size={20} />
          </button>
        </div>
      </div>
    </Link>
  );
}
