import React from 'react';
import { FaPhoneAlt, FaChevronDown } from 'react-icons/fa';

const TopBar = () => {
    return (
        <div style={{
            backgroundColor: '#003D29', // Match primary green
            color: 'white',
            fontSize: '13px',
            padding: '12px 0',
            fontWeight: '500'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {/* Left: Contact */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaPhoneAlt size={12} />
                    <span>+001234567890</span>
                </div>

                {/* Center: Promo */}
                <div style={{ fontWeight: '400', opacity: 0.9 }}>
                    Get 50% Off on Selected Items | <span style={{ fontWeight: '600', textDecoration: 'underline', cursor: 'pointer' }}>Shop Now</span>
                </div>

                {/* Right: Dropdowns */}
                <div style={{ display: 'flex', gap: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <span>Eng</span>
                        <FaChevronDown size={10} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <span>Location</span>
                        <FaChevronDown size={10} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
