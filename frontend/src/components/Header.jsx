import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingCart, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import TopBar from './TopBar';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
    const location = useLocation();
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));
    const { cartCount, fetchCart } = useCart();
    const [keyword, setKeyword] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
        if (localStorage.getItem('userInfo')) {
            fetchCart();
        }
    }, [location]);

    const searchHandler = (e) => {
        if (e.key === 'Enter') {
            if (keyword.trim()) {
                navigate(`/shop?keyword=${keyword}`);
                setIsMenuOpen(false);
            } else {
                navigate('/shop');
                setIsMenuOpen(false);
            }
        }
    };

    const categories = [
        { name: 'Furniture', count: '240 Item Available', img: 'https://e-commerce-jh2x.onrender.com/images/Cat-Furniture.png' },
        { name: 'Hand Bag', count: '240 Item Available', img: 'https://e-commerce-jh2x.onrender.com/images/Cat-HandBag.png' },
        { name: 'Shoe', count: '240 Item Available', img: 'https://e-commerce-jh2x.onrender.com/images/Cat-Sneakers.png' },
        { name: 'Headphone', count: '240 Item Available', img: 'https://e-commerce-jh2x.onrender.com/images/Cat-Tech.png' },
        { name: 'Laptop', count: '240 Item Available', img: 'https://e-commerce-jh2x.onrender.com/images/Cat-Tech.png' },
        { name: 'Book', count: '240 Item Available', img: 'https://e-commerce-jh2x.onrender.com/images/Cat-Books.png' }
    ];

    return (
        <>
            <TopBar />
            <header className="header">
                <div className="container header-content">

                    <div className="header-left">
                        <div className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <FaTimes /> : <FaBars />}
                        </div>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                            <img src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e86ab4c21faa7bc0bd90dd_Logo.svg" alt="Shopcart" style={{ height: '35px' }} />
                        </Link>
                        <nav className="main-nav">
                            <div className="mega-menu-container">
                                <div className="nav-link" style={{ cursor: 'pointer', gap: '8px' }}>
                                    <span>Category</span>
                                    <FaChevronDown size={10} style={{ color: '#003D29' }} />
                                </div>

                                <div className="mega-menu-dropdown" style={{ borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', border: 'none' }}>
                                    <h4 className="mega-menu-title" style={{ borderBottom: '1px solid #F3F4F6' }}>Popular Categories</h4>
                                    <div className="mega-menu-grid">
                                        {categories.map(cat => (
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
                                    className="nav-link"
                                >
                                    {link}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="search-bar-container">
                        <input
                            type="text"
                            placeholder="Search Product"
                            className="search-input"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={searchHandler}
                        />
                        <FaSearch className="search-icon" />
                    </div>

                    <div className="header-right">
                        <Link to={userInfo ? "/profile" : "/login"} className="icon-link">
                            <img src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb3dec9d6ee83660ebe1de_user.png" alt="" style={{ width: '24px' }} />
                            <span>{userInfo ? (userInfo.name?.split(' ')[0] || 'Account') : 'Sign In'}</span>
                        </Link>
                        <Link to="/wishlist" className="icon-link">
                            <img src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb3dec4c0128bb6e2a5c6a_heart.png" alt="" style={{ width: '24px' }} />
                            <span>Wishlist</span>
                        </Link>
                        <Link to="/cart" className="icon-link" style={{ position: 'relative' }}>
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

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="mobile-menu">
                        <div className="mobile-search">
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    placeholder="Search Product"
                                    className="search-input"
                                    style={{ backgroundColor: '#F3F4F6' }}
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    onKeyDown={searchHandler}
                                />
                                <FaSearch className="search-icon" />
                            </div>
                        </div>
                        {['Deals', 'What\'s New', 'Delivery'].map(link => (
                            <Link
                                key={link}
                                to={`/${link.toLowerCase().replace(' ', '-').replace("'", "")}`}
                                onClick={() => setIsMenuOpen(false)}
                                style={{ textDecoration: 'none', color: 'var(--color-dark)', fontWeight: '700' }}
                            >
                                {link}
                            </Link>
                        ))}
                        <div style={{ fontWeight: '700', marginTop: '10px' }}>Categories</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            {categories.map(cat => (
                                <Link
                                    key={cat.name}
                                    to={`/category/${cat.name}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    style={{ textDecoration: 'none', color: 'var(--color-text-muted)', fontSize: '14px' }}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};

export default Header;
