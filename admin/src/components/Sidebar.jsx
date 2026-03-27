import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBoxOpen, FaList, FaShoppingCart, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <FaHome /> },
        { path: '/products', label: 'Products', icon: <FaBoxOpen /> },
        { path: '/categories', label: 'Categories', icon: <FaList /> },
        { path: '/orders', label: 'Orders', icon: <FaShoppingCart /> },
        { path: '/users', label: 'Users', icon: <FaUsers /> },
        { path: '/settings', label: 'Settings', icon: <FaCog /> },
    ];

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        window.location.href = '/login';
    };

    return (
        <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col transition-all duration-300">
            <div className="h-16 flex items-center justify-center border-b border-gray-800">
                <h1 className="text-2xl font-bold tracking-wider text-indigo-400">ADMIN</h1>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-2 px-2">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${location.pathname.startsWith(item.path)
                                        ? 'bg-indigo-600 text-white shadow-lg'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <span className="text-xl mr-3">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={logoutHandler}
                    className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-lg transition-colors duration-200"
                >
                    <FaSignOutAlt className="text-xl mr-3" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
