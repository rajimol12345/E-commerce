import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaFilter, FaTimes, FaSortAmountDown, FaThLarge, FaList } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';

const Shop = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    const categoryFilter = queryParams.get('category') || '';
    const keywordFilter = queryParams.get('keyword') || '';
    
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [sortBy, setSortBy] = useState('newest');
    const [selectedPrices, setSelectedPrices] = useState([]);

    const prices = [
        { label: 'Under $50', min: 0, max: 50 },
        { label: '$50 to $100', min: 50, max: 100 },
        { label: '$100 to $200', min: 100, max: 200 },
        { label: 'Over $200', min: 200, max: 1000000 },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    api.get('/products'),
                    api.get('/categories')
                ]);
                
                let allProducts = productsRes.data.products || productsRes.data || [];
                setCategories(categoriesRes.data || []);

                // Client-side filtering
                if (categoryFilter) {
                    allProducts = allProducts.filter(p => {
                        const pCat = p.category?.name || p.category;
                        return pCat?.toLowerCase() === categoryFilter.toLowerCase();
                    });
                }

                if (keywordFilter) {
                    allProducts = allProducts.filter(p =>
                        p.name.toLowerCase().includes(keywordFilter.toLowerCase()) ||
                        p.description?.toLowerCase().includes(keywordFilter.toLowerCase())
                    );
                }

                if (selectedPrices.length > 0) {
                    allProducts = allProducts.filter(p => {
                        return selectedPrices.some(rangeLabel => {
                            const range = prices.find(r => r.label === rangeLabel);
                            return p.price >= range.min && p.price <= range.max;
                        });
                    });
                }

                // Sorting
                if (sortBy === 'price-low') {
                    allProducts.sort((a, b) => a.price - b.price);
                } else if (sortBy === 'price-high') {
                    allProducts.sort((a, b) => b.price - a.price);
                } else if (sortBy === 'newest') {
                    allProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                }

                setProducts(allProducts);
            } catch (error) {
                console.error("Error fetching shop data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [categoryFilter, keywordFilter, sortBy, selectedPrices]);

    const handleCategoryClick = (catName) => {
        const params = new URLSearchParams(location.search);
        if (catName) {
            params.set('category', catName);
        } else {
            params.delete('category');
        }
        navigate(`/shop?${params.toString()}`);
    };

    const handlePriceChange = (label) => {
        setSelectedPrices(prev =>
            prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
        );
    };

    const clearFilters = () => {
        setSelectedPrices([]);
        setSortBy('newest');
        navigate('/shop');
    };

    return (
        <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
            {/* Header / Hero */}
            <div style={{ backgroundColor: 'white', borderBottom: '1px solid #E5E7EB', padding: '60px 0' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 style={{ fontSize: '42px', fontWeight: '800', color: '#111827', margin: 0 }}>
                            {categoryFilter ? categoryFilter : 'Our Collection'}
                        </h1>
                        <p style={{ color: '#6B7280', fontSize: '18px', marginTop: '12px', maxWidth: '600px' }}>
                            {keywordFilter ? `Showing results for "${keywordFilter}"` : 'Browse through our curated selection of high-quality products.'}
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container" style={{ padding: '40px 20px' }}>
                <div style={{ display: 'flex', gap: '40px', position: 'relative' }}>
                    
                    {/* Desktop Sidebar */}
                    <aside className="desktop-filters" style={{ width: '280px', flexShrink: 0, display: 'block' }}>
                        <div style={{ position: 'sticky', top: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111827' }}>Filters</h3>
                                <button 
                                    onClick={clearFilters}
                                    style={{ background: 'none', border: 'none', color: '#003D29', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Categories */}
                            <div style={{ marginBottom: '40px' }}>
                                <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px', color: '#374151' }}>Categories</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <button
                                        onClick={() => handleCategoryClick('')}
                                        style={categoryButtonStyle(!categoryFilter)}
                                    >
                                        All Products
                                    </button>
                                    {categories.map(cat => (
                                        <button
                                            key={cat._id}
                                            onClick={() => handleCategoryClick(cat.name)}
                                            style={categoryButtonStyle(categoryFilter.toLowerCase() === cat.name.toLowerCase())}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Ranges */}
                            <div style={{ marginBottom: '40px' }}>
                                <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px', color: '#374151' }}>Price Range</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {prices.map(p => (
                                        <label key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: '#4B5563', fontSize: '15px' }}>
                                            <input
                                                type="checkbox"
                                                checked={selectedPrices.includes(p.label)}
                                                onChange={() => handlePriceChange(p.label)}
                                                style={{ width: '18px', height: '18px', accentColor: '#003D29', borderRadius: '4px' }}
                                            />
                                            {p.label}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div style={{ flex: 1 }}>
                        
                        {/* Controls Bar */}
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            marginBottom: '32px',
                            backgroundColor: 'white',
                            padding: '16px 24px',
                            borderRadius: '16px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <button 
                                    className="mobile-filter-btn"
                                    onClick={() => setShowMobileFilters(true)}
                                    style={{ 
                                        display: 'none', 
                                        alignItems: 'center', 
                                        gap: '8px',
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        border: '1px solid #E5E7EB',
                                        background: 'white',
                                        fontWeight: '600'
                                    }}
                                >
                                    <FaFilter /> Filters
                                </button>
                                <span style={{ color: '#6B7280', fontSize: '15px', fontWeight: '500' }}>
                                    {products.length} Products found
                                </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6B7280', fontSize: '14px' }}>
                                    <FaSortAmountDown />
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        style={{ 
                                            border: 'none', 
                                            background: 'none', 
                                            fontWeight: '700', 
                                            color: '#111827', 
                                            cursor: 'pointer',
                                            outline: 'none'
                                        }}
                                    >
                                        <option value="newest">Newest</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {loading ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} style={{ height: '400px', backgroundColor: '#E5E7EB', borderRadius: '16px', animation: 'pulse 2s infinite' }}></div>
                                ))}
                            </div>
                        ) : products.length > 0 ? (
                            <motion.div 
                                layout
                                style={{ 
                                    display: 'grid', 
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                                    gap: '32px' 
                                }}
                            >
                                <AnimatePresence>
                                    {products.map(product => (
                                        <motion.div
                                            key={product._id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ProductCard product={product} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                                <div style={{ fontSize: '64px', marginBottom: '24px' }}>🔍</div>
                                <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#111827' }}>No products found</h3>
                                <p style={{ color: '#6B7280', marginTop: '8px' }}>Try adjusting your filters or search terms.</p>
                                <button 
                                    onClick={clearFilters}
                                    style={{ marginTop: '24px', padding: '12px 24px', backgroundColor: '#003D29', color: 'white', borderRadius: '50px', border: 'none', fontWeight: '700', cursor: 'pointer' }}
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filters Drawer */}
            <AnimatePresence>
                {showMobileFilters && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowMobileFilters(false)}
                            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000 }}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '85%', maxWidth: '360px', backgroundColor: 'white', zIndex: 1001, padding: '32px' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                                <h3 style={{ fontSize: '24px', fontWeight: '800' }}>Filters</h3>
                                <button onClick={() => setShowMobileFilters(false)} style={{ background: 'none', border: 'none', fontSize: '20px' }}><FaTimes /></button>
                            </div>

                            {/* Same Filter Content as Desktop */}
                            <div style={{ marginBottom: '40px' }}>
                                <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>Categories</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {['All', ...categories.map(c => c.name)].map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => {
                                                handleCategoryClick(cat === 'All' ? '' : cat);
                                                setShowMobileFilters(false);
                                            }}
                                            style={{
                                                padding: '10px 20px',
                                                borderRadius: '50px',
                                                border: '1.5px solid',
                                                borderColor: (cat === 'All' && !categoryFilter) || categoryFilter.toLowerCase() === cat.toLowerCase() ? '#003D29' : '#E5E7EB',
                                                backgroundColor: (cat === 'All' && !categoryFilter) || categoryFilter.toLowerCase() === cat.toLowerCase() ? '#003D29' : 'white',
                                                color: (cat === 'All' && !categoryFilter) || categoryFilter.toLowerCase() === cat.toLowerCase() ? 'white' : '#4B5563',
                                                fontWeight: '600',
                                                fontSize: '14px'
                                            }}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginBottom: '40px' }}>
                                <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>Price Range</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {prices.map(p => (
                                        <label key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '16px' }}>
                                            <input
                                                type="checkbox"
                                                checked={selectedPrices.includes(p.label)}
                                                onChange={() => handlePriceChange(p.label)}
                                                style={{ width: '20px', height: '20px', accentColor: '#003D29' }}
                                            />
                                            {p.label}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button 
                                onClick={() => setShowMobileFilters(false)}
                                style={{ width: '100%', padding: '16px', backgroundColor: '#003D29', color: 'white', borderRadius: '50px', border: 'none', fontWeight: '700', fontSize: '16px', marginTop: 'auto' }}
                            >
                                Show {products.length} Results
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                @media (max-width: 1024px) {
                    .desktop-filters {
                        display: none !important;
                    }
                    .mobile-filter-btn {
                        display: flex !important;
                    }
                }
                @media (max-width: 640px) {
                    .product-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
};

const categoryButtonStyle = (isActive) => ({
    background: 'none',
    border: 'none',
    textAlign: 'left',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: isActive ? '700' : '500',
    color: isActive ? '#003D29' : '#4B5563',
    backgroundColor: isActive ? '#ECFDF5' : 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'block',
    width: '100%'
});

export default Shop;
