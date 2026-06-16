import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, Plus, Minus, CreditCard, ShoppingCart, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartSubtotal, clearCart } = useCart();
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setCheckoutComplete(true);
    clearCart();
  };

  const shippingCost = cartSubtotal > 150 ? 0 : 15;
  const taxCost = cartSubtotal * 0.08;
  const orderTotal = cartSubtotal + shippingCost + taxCost;

  if (checkoutComplete) {
    return (
      <div className="no-results glass-panel" style={{ padding: '80px 20px', marginTop: '40px', textAlign: 'center' }}>
        <CheckCircle size={64} color="#10b981" style={{ marginBottom: '24px', filter: 'drop-shadow(0 0 10px rgba(16,185,129,0.3))' }} />
        <h2 className="gradient-text">Order Placed Successfully!</h2>
        <p style={{ margin: '12px 0 30px', color: '#9ca3af', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
          Thank you for shopping with ShopNow! Your simulated order has been processed. In a real environment, this transaction would trigger a webhook to our dispatch service.
        </p>
        <button onClick={() => navigate('/products')} className="btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart glass-panel" style={{ marginTop: '40px' }}>
        <ShoppingBag className="empty-cart-icon" size={60} />
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="btn-primary">
          Start Exploring
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 className="gradient-text">Your Shopping Cart</h1>
        <p style={{ color: '#9ca3af' }}>Review and manage the items selected for purchase.</p>
      </div>

      <div className="cart-layout">
        {/* Cart Items List */}
        <div className="cart-items-panel">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item glass-panel">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <Link to={`/products/${item.id}`}>
                  <h3 className="cart-item-name">{item.name}</h3>
                </Link>
                <span className="cart-item-category">{item.category}</span>
                <div className="cart-item-quantity" style={{ marginTop: '12px' }}>
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="quantity-val">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <div className="cart-item-price-actions">
                <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Summary Card */}
        <aside className="cart-summary-panel glass-panel">
          <h3 className="summary-title">Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${cartSubtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Estimated Shipping</span>
            <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
          </div>
          <div className="summary-row">
            <span>Estimated Tax (8%)</span>
            <span>${taxCost.toFixed(2)}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>
          <button className="btn-primary btn-checkout" onClick={handleCheckout}>
            <CreditCard size={18} /> Proceed to Checkout
          </button>
          {shippingCost > 0 && (
            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '16px', textAlign: 'center' }}>
              Add <b>${(150 - cartSubtotal).toFixed(2)}</b> more to qualify for FREE shipping!
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
