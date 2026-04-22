import React from 'react';
import { FaPhoneAlt, FaChevronDown } from 'react-icons/fa';
import './TopBar.css';

const TopBar = () => {
    return (
        <div className="top-bar">
            <div className="container top-bar-content">
                {/* Left: Contact */}
                <div className="top-bar-left">
                    <FaPhoneAlt size={12} />
                    <span>+001234567890</span>
                </div>

                {/* Center: Promo */}
                <div className="top-bar-center" style={{ fontWeight: '400', opacity: 0.9 }}>
                    Get 50% Off on Selected Items | <span style={{ fontWeight: '600', textDecoration: 'underline', cursor: 'pointer' }}>Shop Now</span>
                </div>

                {/* Right: Dropdowns */}
                <div className="top-bar-right">
                    <div className="top-bar-dropdown">
                        <span>Eng</span>
                        <FaChevronDown size={10} />
                    </div>
                    <div className="top-bar-dropdown">
                        <span>Location</span>
                        <FaChevronDown size={10} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
