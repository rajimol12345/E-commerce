import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    FaThLarge,
    FaBox,
    FaClipboardList,
    FaUsers,
    FaTags,
    FaSignOutAlt
} from 'react-icons/fa';
import '../styles/admin.css';

const Sidebar = () => {
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: <FaThLarge /> },
        { path: '/admin/products', label: 'Products', icon: <FaBox /> },
        { path: '/admin/categories', label: 'Categories', icon: <FaTags /> },
        { path: '/admin/orders', label: 'Orders', icon: <FaClipboardList /> },
        { path: '/admin/users', label: 'Users', icon: <FaUsers /> },
        { path: '/admin/profile', label: 'Profile', icon: <FaUsers /> }, // Added Profile link to Sidebar as requested by user ("SIDEBAR MENU: ... Profile")
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo-text">ADMIN PANEL</div>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        {item.label}
                    </NavLink>
                ))}

                <div
                    className="nav-item"
                    onClick={logoutHandler}
                    style={{ cursor: 'pointer', marginTop: '20px', borderTop: '1px solid #333a48' }}
                >
                    <span className="nav-icon"><FaSignOutAlt /></span>
                    Logout
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
