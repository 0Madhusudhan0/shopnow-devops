import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/data/products.json')
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.find((p) => p.id === parseInt(id));
        if (foundProduct) {
          setProduct(foundProduct);
          const related = data.filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id);
          setSimilarProducts(related.slice(0, 3));
        } else {
          setProduct(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching details:', err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <h3 className="gradient-text">Loading product details...</h3>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="no-results glass-panel" style={{ padding: '80px 20px', marginTop: '40px' }}>
        <h2>Product Not Found</h2>
        <p style={{ margin: '12px 0 24px' }}>The product you are looking for does not exist or has been removed.</p>
        <button onClick={() => navigate('/products')} className="btn-primary">
          <ArrowLeft size={16} /> Back to Products
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
      <div>
        <button onClick={() => navigate(-1)} className="btn-secondary" style={{ padding: '10px 20px', fontSize: '14px' }}>
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="product-details">
        {/* Product Image */}
        <div className="details-image-panel">
          <img src={product.image} alt={product.name} className="details-img" />
        </div>

        {/* Product Information */}
        <div className="details-info-panel">
          <span className="details-category">{product.category}</span>
          <h1 className="details-title">{product.name}</h1>
          
          <div className="details-meta">
            <div className="details-rating">
              <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
              <span>{product.rating}</span>
            </div>
            <span style={{ color: '#4b5563' }}>|</span>
            <span className="details-reviews">{product.reviews} customer reviews</span>
          </div>

          <div className="details-price">${product.price.toFixed(2)}</div>
          
          <p className="details-description">{product.description}</p>

          <div className="details-specs">
            <h3 style={{ fontSize: '18px', marginBottom: '14px' }}>Specifications</h3>
            <table className="specs-table">
              <tbody>
                {Object.entries(product.specs).map(([key, val]) => (
                  <tr key={key} className="specs-row">
                    <td className="specs-key">{key}</td>
                    <td className="specs-val">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="add-to-cart-wrapper">
            <button
              onClick={handleAddToCart}
              className={`btn-primary btn-details-add ${added ? 'success' : ''}`}
              style={{ background: added ? '#10b981' : '', boxShadow: added ? '0 4px 15px rgba(16, 185, 129, 0.4)' : '' }}
            >
              {added ? (
                <>
                  <Check size={18} /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart size={18} /> Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {similarProducts.length > 0 && (
        <section className="similar-section">
          <h2 className="similar-title gradient-text">You May Also Like</h2>
          <div className="products-grid">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
