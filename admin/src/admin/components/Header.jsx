import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaChevronDown } from 'react-icons/fa';
import '../styles/admin.css';

const Header = ({ title, user }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    // Get user info safely, prioritize prop for instant updates
    const userInfo = user || JSON.parse(localStorage.getItem('userInfo') || '{}');

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/admin/login');
    };

    return (
        <header className="top-header">
            <h1 className="page-title">{title}</h1>

            <div className="header-right">
                <div
                    className="profile-dropdown"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    <div className="profile-info">
                        <span className="profile-name">{userInfo.name || 'Admin User'}</span>
                        <span className="profile-role">Administrator</span>
                    </div>
                    <div className="profile-img">
                        {userInfo.image ? (
                            <img
                                src={userInfo.image.startsWith('http') ? userInfo.image : `http://localhost:5000${userInfo.image}`}
                                alt="Profile"
                            />
                        ) : (
                            <FaUserCircle size={40} color="#cbd5e1" />
                        )}
                    </div>
                    <FaChevronDown size={12} color="#64748b" />

                    {dropdownOpen && (
                        <div style={{
                            position: 'absolute',
                            top: '120%',
                            right: 0,
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            width: '150px',
                            padding: '8px 0',
                            zIndex: 100
                        }}>
                            <div
                                onClick={() => navigate('/admin/profile')}
                                style={{
                                    padding: '10px 16px',
                                    fontSize: '14px',
                                    color: '#1c2434',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.background = '#f1f5f9'}
                                onMouseLeave={(e) => e.target.style.background = 'white'}
                            >
                                Profile
                            </div>
                            <div
                                onClick={logoutHandler}
                                style={{
                                    padding: '10px 16px',
                                    fontSize: '14px',
                                    color: '#dc2626',
                                    cursor: 'pointer',
                                    borderTop: '1px solid #f1f5f9'
                                }}
                                onMouseEnter={(e) => e.target.style.background = '#fef2f2'}
                                onMouseLeave={(e) => e.target.style.background = 'white'}
                            >
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
