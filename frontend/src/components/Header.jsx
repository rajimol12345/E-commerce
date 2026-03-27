import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingCart, FaChevronDown } from 'react-icons/fa';
import TopBar from './TopBar';
import { useCart } from '../context/CartContext';

const Header = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const { cartCount } = useCart();
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const searchHandler = (e) => {
        if (e.key === 'Enter') {
            if (keyword.trim()) {
                navigate(`/shop?keyword=${keyword}`);
            } else {
                navigate('/shop');
            }
        }
    };

    return (
        <>
            <TopBar />
            <header style={{
                height: '80px',
                borderBottom: '1px solid var(--color-border)',
                backgroundColor: 'white',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center'
            }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>

                    {/* 1. Logo & Nav */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                            <img src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e86ab4c21faa7bc0bd90dd_Logo.svg" alt="Shopcart" style={{ height: '35px' }} />
                        </Link>
                        <nav style={{ display: 'flex', alignItems: 'center', gap: '30px', fontWeight: '700', fontSize: '15px', color: '#231F1E' }}>
                            <div className="mega-menu-container">
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', height: '80px',
                                    transition: 'color 0.2s'
                                }}
                                    onMouseOver={(e) => e.currentTarget.style.color = '#003D29'}
                                    onMouseOut={(e) => e.currentTarget.style.color = '#231F1E'}
                                >
                                    <span>Category</span>
                                    <FaChevronDown size={10} style={{ color: '#003D29' }} />
                                </div>

                                <div className="mega-menu-dropdown" style={{ borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', border: 'none' }}>
                                    <h4 className="mega-menu-title" style={{ borderBottom: '1px solid #F3F4F6' }}>Popular Categories</h4>
                                    <div className="mega-menu-grid">
                                        {[
                                            { name: 'Furniture', count: '240 Item Available', img: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63ec6052dc39b839500c1f8a_Rectangle%201436.png' },
                                            { name: 'Hand Bag', count: '240 Item Available', img: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63ec605386e48004f02ee6a8_Rectangle%201436-4.png' },
                                            { name: 'Shoe', count: '240 Item Available', img: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63ec6052f0ed215b864af96e_Rectangle%201436-1.png' },
                                            { name: 'Headphone', count: '240 Item Available', img: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63ec6053e5b15cfafd550cbb_Rectangle%201436-3.png' },
                                            { name: 'Laptop', count: '240 Item Available', img: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63ec6052f3741a4f87af0f6d_Rectangle%201436-2.png' },
                                            { name: 'Book', count: '240 Item Available', img: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63ec622235f3f730c0de8c3f_Rectangle%201436-5.png' }
                                        ].map(cat => (
                                            <Link key={cat.name} to={`/category/${cat.name}`} className="mega-menu-card" style={{ borderRadius: '16px' }}>
                                                <img src={cat.img} alt={cat.name} style={{ borderRadius: '12px' }} />
                                                <div>
                                                    <div className="mega-menu-card-title">{cat.name}</div>
                                                    <div className="mega-menu-card-count">{cat.count}</div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {['Deals', 'What\'s New', 'Delivery'].map(link => (
                                <Link
                                    key={link}
                                    to={`/${link.toLowerCase().replace(' ', '-').replace("'", "")}`}
                                    style={{
                                        color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', height: '80px',
                                        transition: 'all 0.2s',
                                        position: 'relative'
                                    }}
                                    onMouseOver={(e) => { e.currentTarget.style.color = '#003D29'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.color = '#231F1E'; }}
                                >
                                    {link}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* 2. Search Bar */}
                    <div style={{ flex: 1, maxWidth: '380px', margin: '0 30px', position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Search Product"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={searchHandler}
                            style={{
                                width: '100%',
                                height: '44px',
                                borderRadius: 'var(--radius-pill)',
                                border: '1px solid transparent',
                                backgroundColor: '#F3F4F6',
                                padding: '0 20px 0 45px',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                            onBlur={(e) => e.target.style.borderColor = 'transparent'}
                        />
                        <FaSearch style={{
                            position: 'absolute',
                            left: '18px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--color-text-muted)',
                            opacity: 0.7
                        }} />
                    </div>

                    {/* 3. Account, Wishlist & Cart */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
                        <Link to={userInfo ? "/profile" : "/login"} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-dark)', textDecoration: 'none', fontWeight: '600' }}>
                            <img src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb3dec9d6ee83660ebe1de_user.png" alt="" style={{ width: '24px' }} />
                            <span>{userInfo ? 'Account' : 'Sign In'}</span>
                        </Link>
                        <Link to="/wishlist" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-dark)', textDecoration: 'none', fontWeight: '600' }}>
                            <img src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb3dec4c0128bb6e2a5c6a_heart.png" alt="" style={{ width: '24px' }} />
                            <span>Wishlist</span>
                        </Link>
                        <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-dark)', textDecoration: 'none', fontWeight: '600', position: 'relative' }}>
                            <div style={{ position: 'relative' }}>
                                <img src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb3dec9b865e78d4ff6b8d_shopping-cart-add.png" alt="" style={{ width: '24px' }} />
                                {cartCount > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-8px',
                                        right: '-8px',
                                        backgroundColor: '#003D29',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: '18px',
                                        height: '18px',
                                        fontSize: '11px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: '700',
                                        border: '2px solid white'
                                    }}>
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span>Cart</span>
                        </Link>
                    </div>

                </div>
            </header>
        </>
    );
};

export default Header;
