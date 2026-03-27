import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import api from '../utils/api';
import { useCart } from '../context/CartContext';

const TabbedProducts = () => {
    const { addToCart: contextAddToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [favorites, setFavorites] = useState(new Set());
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes, wishlistRes] = await Promise.all([
                    api.get('/products'),
                    api.get('/categories'),
                    api.get('/wishlist').catch(() => ({ data: { products: [] } }))
                ]);

                const allProducts = productsRes.data.products || productsRes.data || [];
                setProducts(allProducts);
                setFilteredProducts(allProducts.slice(0, 8));

                const allCategories = categoriesRes.data || [];
                setCategories(allCategories);

                const wishProducts = wishlistRes.data.products || [];
                setFavorites(new Set(wishProducts.map(p => p._id || p)));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleCategoryChange = (categoryName) => {
        setActiveCategory(categoryName);

        if (categoryName === 'All') {
            setFilteredProducts(products.slice(0, 8));
        } else {
            const filtered = products.filter(p =>
                (typeof p.category === 'object' ? p.category.name : p.category) === categoryName
            ).slice(0, 8);
            setFilteredProducts(filtered);
        }
    };

    const toggleFavorite = async (productId) => {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            window.location.href = '/login?redirect=wishlist';
            return;
        }

        try {
            await api.post('/wishlist', { productId });
            setFavorites(prev => {
                const newFavorites = new Set(prev);
                if (newFavorites.has(productId)) {
                    newFavorites.delete(productId);
                } else {
                    newFavorites.add(productId);
                }
                return newFavorites;
            });
        } catch (error) {
            console.error('Error toggling wishlist:', error);
        }
    };

    const handleAddToCart = async (product) => {
        try {
            await contextAddToCart(product, 1);
            alert('Added to cart!');
        } catch (error) {
            alert('Failed to add to cart');
        }
    };

    // Get unique category names for tabs
    const categoryTabs = ['All', ...categories.slice(0, 7).map(c => c.name)];

    return (
        <section style={{
            padding: '80px 0',
            backgroundColor: 'white'
        }}>
            <div className="container">
                <h2 style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    marginBottom: '40px',
                    color: '#23262F'
                }}>
                    Today's Best Deals For You!
                </h2>

                {/* Category Tabs */}
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '40px',
                    flexWrap: 'wrap'
                }}>
                    {categoryTabs.map(category => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            style={{
                                padding: '10px 24px',
                                backgroundColor: activeCategory === category ? 'var(--color-primary)' : 'white',
                                color: activeCategory === category ? 'white' : '#23262F',
                                border: `1.5px solid ${activeCategory === category ? 'var(--color-primary)' : '#E6E8EC'}`,
                                borderRadius: '50px',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                whiteSpace: 'nowrap'
                            }}
                            onMouseEnter={(e) => {
                                if (activeCategory !== category) {
                                    e.target.style.borderColor = 'var(--color-primary)';
                                    e.target.style.color = 'var(--color-primary)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (activeCategory !== category) {
                                    e.target.style.borderColor = '#E6E8EC';
                                    e.target.style.color = '#23262F';
                                }
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '24px'
                }}>
                    {filteredProducts.map(product => (
                        <div
                            key={product._id}
                            style={{
                                backgroundColor: '#F4F5F6',
                                borderRadius: '16px',
                                padding: '24px',
                                position: 'relative',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Favorite Icon */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(product._id);
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    background: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '36px',
                                    height: '36px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    zIndex: 2
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                {favorites.has(product._id) ? (
                                    <FaHeart style={{ color: '#FF6B6B', fontSize: '16px' }} />
                                ) : (
                                    <FaRegHeart style={{ color: '#777E90', fontSize: '16px' }} />
                                )}
                            </button>

                            {/* Product Image */}
                            <Link to={`/product/${product._id}`}>
                                <div style={{
                                    width: '100%',
                                    height: '200px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '20px',
                                    backgroundColor: 'white',
                                    borderRadius: '12px',
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        src={product.image?.startsWith('http') ? product.image : `https://e-commerce-jh2x.onrender.com${product.image}`}
                                        alt={product.name}
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </div>
                            </Link>

                            {/* Product Info */}
                            <div>
                                <Link
                                    to={`/product/${product._id}`}
                                    style={{
                                        textDecoration: 'none',
                                        color: '#23262F'
                                    }}
                                >
                                    <h3 style={{
                                        fontSize: '16px',
                                        fontWeight: '700',
                                        marginBottom: '8px',
                                        color: '#23262F',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {product.name}
                                    </h3>
                                </Link>

                                <p style={{
                                    fontSize: '12px',
                                    color: '#777E90',
                                    marginBottom: '12px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {product.description}
                                </p>

                                {/* Rating */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    marginBottom: '16px'
                                }}>
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            style={{
                                                color: i < Math.floor(product.rating || 4) ? '#FFC107' : '#E6E8EC',
                                                fontSize: '14px'
                                            }}
                                        />
                                    ))}
                                    <span style={{
                                        fontSize: '12px',
                                        color: '#777E90',
                                        marginLeft: '4px'
                                    }}>
                                        ({product.numReviews || 121})
                                    </span>
                                </div>

                                {/* Price & Button */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span style={{
                                        fontSize: '20px',
                                        fontWeight: '800',
                                        color: '#23262F'
                                    }}>
                                        ${product.price}
                                        <sup style={{
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            marginLeft: '2px'
                                        }}>
                                            .00
                                        </sup>
                                    </span>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(product);
                                        }}
                                        style={{
                                            padding: '8px 20px',
                                            backgroundColor: 'white',
                                            color: '#23262F',
                                            border: '1.5px solid #E6E8EC',
                                            borderRadius: '50px',
                                            fontSize: '13px',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s',
                                            whiteSpace: 'nowrap'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = 'var(--color-primary)';
                                            e.target.style.color = 'white';
                                            e.target.style.borderColor = 'var(--color-primary)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = 'white';
                                            e.target.style.color = '#23262F';
                                            e.target.style.borderColor = '#E6E8EC';
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TabbedProducts;
