import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';
import { useLocation } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryFilter = queryParams.get('category');
    const keywordFilter = queryParams.get('keyword');

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await api.get('/products');
                let allProducts = data.products || data || [];

                if (categoryFilter) {
                    allProducts = allProducts.filter(p =>
                        (p.category?.name || p.category) === categoryFilter
                    );
                }

                if (keywordFilter) {
                    allProducts = allProducts.filter(p =>
                        p.name.toLowerCase().includes(keywordFilter.toLowerCase())
                    );
                }

                setProducts(allProducts);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };
        fetch();
    }, [categoryFilter, keywordFilter]);

    const [sortBy, setSortBy] = useState('Popularity');
    const [selectedPrices, setSelectedPrices] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await api.get('/products');
                let allProducts = data.products || data || [];

                // Filter by Category
                if (categoryFilter) {
                    allProducts = allProducts.filter(p =>
                        (p.category?.name || p.category) === categoryFilter
                    );
                }

                // Filter by Keyword
                if (keywordFilter) {
                    allProducts = allProducts.filter(p =>
                        p.name.toLowerCase().includes(keywordFilter.toLowerCase())
                    );
                }

                // Filter by Price
                if (selectedPrices.length > 0) {
                    allProducts = allProducts.filter(p => {
                        return selectedPrices.some(range => {
                            if (range === 'Under $50') return p.price < 50;
                            if (range === '$50 to $100') return p.price >= 50 && p.price <= 100;
                            if (range === '$100 to $200') return p.price >= 100 && p.price <= 200;
                            if (range === 'Over $200') return p.price > 200;
                            return false;
                        });
                    });
                }

                // Sort Products
                if (sortBy === 'Price: Low to High') {
                    allProducts.sort((a, b) => a.price - b.price);
                } else if (sortBy === 'Price: High to Low') {
                    allProducts.sort((a, b) => b.price - a.price);
                } else if (sortBy === 'Newest') {
                    allProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                }

                setProducts(allProducts);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };
        fetch();
    }, [categoryFilter, keywordFilter, sortBy, selectedPrices]);

    const handlePriceChange = (range) => {
        setSelectedPrices(prev =>
            prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
        );
    };

    const categories = ['Furniture', 'Hand Bag', 'Books', 'Tech', 'Sneakers', 'Travel'];
    const prices = ['Under $50', '$50 to $100', '$100 to $200', 'Over $200'];

    return (
        <div style={{ backgroundColor: '#F9F9F9', minHeight: '100vh', paddingBottom: '80px' }}>
            <div style={{ backgroundColor: 'white', borderBottom: '1px solid #E5E5E5', padding: '30px 0' }}>
                <div className="container">
                    <h1 style={{ fontSize: '32px', fontWeight: '800', margin: 0, color: '#231F1E' }}>
                        {keywordFilter ? `Search results for "${keywordFilter}"` : (categoryFilter ? `${categoryFilter} Collection` : 'Shop')}
                    </h1>
                    <p style={{ color: '#777E90', marginTop: '10px' }}>
                        Explore the best products for your needs.
                    </p>
                </div>
            </div>

            <div className="container" style={{ paddingTop: '60px', display: 'flex', gap: '50px' }}>
                <aside style={{ width: '260px', flexShrink: 0 }}>
                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#231F1E' }}>Category</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <button style={{
                                background: 'transparent',
                                border: 'none',
                                textAlign: 'left',
                                fontSize: '16px',
                                color: !categoryFilter ? '#003D29' : '#5F6C72',
                                fontWeight: !categoryFilter ? '700' : '500',
                                cursor: 'pointer',
                                padding: '5px 0'
                            }}
                                onClick={() => window.location.href = `/shop`}
                            >
                                All Products
                            </button>
                            {categories.map(cat => (
                                <button key={cat} style={{
                                    background: 'transparent',
                                    border: 'none',
                                    textAlign: 'left',
                                    fontSize: '16px',
                                    color: cat === categoryFilter ? '#003D29' : '#5F6C72',
                                    fontWeight: cat === categoryFilter ? '700' : '500',
                                    cursor: 'pointer',
                                    padding: '5px 0'
                                }}
                                    onClick={() => window.location.href = `/shop?category=${cat}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#231F1E' }}>Price Range</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {prices.map(price => (
                                <label key={price} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', color: '#5F6C72', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedPrices.includes(price)}
                                        onChange={() => handlePriceChange(price)}
                                        style={{ width: '18px', height: '18px', accentColor: '#003D29' }}
                                    />
                                    {price}
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <p style={{ color: '#777E90', fontWeight: '500' }}>
                            Showing {products.length} products
                        </p>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                padding: '10px 16px',
                                borderRadius: '50px',
                                border: '1px solid #E6E8EC',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#231F1E',
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <option>Popularity</option>
                            <option>Newest</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>

                    {products.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                            gap: '30px',
                            rowGap: '40px'
                        }}>
                            {products.map(p => <ProductCard key={p._id} product={p} />)}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: '#777E90', fontSize: '18px' }}>
                            No products found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
