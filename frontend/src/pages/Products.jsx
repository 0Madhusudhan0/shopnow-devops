import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    fetch('/data/products.json')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  useEffect(() => {
    let result = [...products];

    // Filter by Category
    if (category !== 'All') {
      result = result.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by Search
    if (search.trim() !== '') {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [category, search, sortBy, products]);

  const categories = ['All', 'Electronics', 'Apparel', 'Home Decor', 'Accessories'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 className="gradient-text">Our Collection</h1>
        <p style={{ color: '#9ca3af' }}>Explore our catalog of high-quality handcrafted goods.</p>
      </div>

      <div className="products-page-layout">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar glass-panel">
          <div className="filter-group">
            <h3 className="filter-title">Search</h3>
            <div className="search-wrapper">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                className="search-input"
                placeholder="Type to search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">Categories</h3>
            <div className="filter-list">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${category === cat ? 'active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Catalog Content */}
        <div className="products-content-area">
          <div className="products-toolbar">
            <span className="products-count">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label htmlFor="sort" style={{ fontSize: '14px', color: '#9ca3af' }}>Sort by:</label>
              <select
                id="sort"
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-results glass-panel">
              <h3>No products found</h3>
              <p style={{ marginTop: '8px' }}>Try resetting your search query or selected category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
