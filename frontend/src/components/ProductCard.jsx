import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import api from '../utils/api';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const priceParts = product.price ? product.price.toString().split('.') : ['0', '00'];
    const whole = priceParts[0];
    const decimal = priceParts[1] || '00';

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        try {
            await addToCart(product, 1);
            alert('Added to cart!');
        } catch (error) {
            alert('Failed to add to cart');
        }
    };

    const toggleWishlist = async (e) => {
        e.stopPropagation();
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            window.location.href = '/login?redirect=wishlist';
            return;
        }

        try {
            await api.post('/wishlist', { productId: product._id });
            setIsWishlisted(!isWishlisted);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex', flexDirection: 'column',
            transition: 'all 0.3s ease',
            border: 'none',
            cursor: 'pointer'
        }}
            className="product-card"
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >

            {/* Wishlist Icon */}
            <div
                onClick={toggleWishlist}
                style={{
                    position: 'absolute', top: '16px', right: '16px',
                    background: 'white', borderRadius: '50%',
                    width: '36px', height: '36px', border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    cursor: 'pointer', zIndex: 2
                }}>
                {isWishlisted ? (
                    <FaHeart style={{ color: '#FF6B6B', fontSize: '16px' }} />
                ) : (
                    <FaRegHeart style={{ color: '#777E90', fontSize: '16px' }} />
                )}
            </div>

            {/* Image Area */}
            <div style={{
                backgroundColor: '#F5F6F6',
                height: '220px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '24px',
                borderRadius: '12px',
                margin: '12px'
            }}>
                <Link to={`/product/${product._id}`} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                        src={product.image?.startsWith('http') ? product.image : `https://e-commerce-jh2x.onrender.com${product.image}`}
                        alt={product.name}
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    />
                </Link>
            </div>

            {/* Content */}
            <div style={{ padding: '0 20px 24px 20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <Link to={`/product/${product._id}`} style={{ fontWeight: '700', fontSize: '16px', color: '#231F1E', textDecoration: 'none', lineHeight: '1.4', paddingRight: '10px' }}>
                        {product.name}
                    </Link>
                    <div style={{ fontWeight: '800', fontSize: '18px', color: '#231F1E', whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: '12px', verticalAlign: 'super', marginRight: '2px' }}>$</span>
                        {whole}
                        <span style={{ fontSize: '12px', verticalAlign: 'super' }}>.{decimal}</span>
                    </div>
                </div>

                <p style={{ fontSize: '13px', margin: '0 0 12px 0', color: '#5F6C72', lineHeight: '1.5', height: '40px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {product.description || 'Experience premium quality with our curated selection best for you.'}
                </p>

                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{ display: 'flex', color: '#FFC107', fontSize: '12px' }}>
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} style={{ color: i < (product.rating || 4) ? '#FFC107' : '#E6E8EC' }} />
                            ))}
                        </div>
                        <span style={{ fontSize: '12px', color: '#777E90', marginLeft: '4px' }}>({product.numReviews || 121})</span>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '50px',
                            border: '1.5px solid #231F1E',
                            background: 'transparent',
                            color: '#231F1E',
                            fontWeight: '700',
                            fontSize: '13px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#003D29'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#003D29'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#231F1E'; e.currentTarget.style.borderColor = '#231F1E'; }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
