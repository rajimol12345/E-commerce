import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/api';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const { data } = await api.post('/users/login', { email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));

            if (data.role === 'admin') {
                window.location.href = 'http://localhost:5173/admin/dashboard';
            } else {
                navigate(redirect);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Invalid email or password');
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>

            {/* Left Side - Image */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                style={{
                    flex: '1',
                    display: 'none',
                    '@media (min-width: 768px)': { display: 'block' } // Handled via CSS usually, but here relying on flex behavior or inline logic
                }}
                className="desktop-only-image" // Helper class if needed, or inline style check
            >
                <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80)', // Fashion/Shopping Image
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0, 61, 41, 0.4)', // Dark green overlay
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '60px'
                    }}>
                        <h2 style={{ color: 'white', fontSize: '36px', fontWeight: '800', marginBottom: '16px' }}>
                            Welcome back to Muse
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', maxWidth: '400px' }}>
                            Discover the latest trends in fashion and lifestyle.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Right Side - Form */}
            <div style={{
                flex: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                padding: '40px'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    style={{ width: '100%', maxWidth: '440px' }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#231F1E', marginBottom: '8px' }}>Sign In</h1>
                        <p style={{ color: '#5F6C72' }}>Enter your details to access your account</p>
                    </div>

                    {error && (
                        <div style={{
                            backgroundColor: '#FEE2E2', color: '#DC2626',
                            padding: '12px', borderRadius: '12px', marginBottom: '24px',
                            textAlign: 'center', fontSize: '14px', fontWeight: '500'
                        }}>{error}</div>
                    )}

                    <form onSubmit={submitHandler}>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#231F1E' }}>Email</label>
                            <div style={{ position: 'relative' }}>
                                <FaEnvelope style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{
                                        width: '100%', padding: '16px 16px 16px 50px',
                                        borderRadius: '50px', border: '1px solid #E5E7EB',
                                        fontSize: '16px', outline: 'none', transition: 'all 0.2s',
                                        backgroundColor: '#F9FAFB'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#003D29'}
                                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '32px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#231F1E' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <FaLock style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={{
                                        width: '100%', padding: '16px 16px 16px 50px',
                                        borderRadius: '50px', border: '1px solid #E5E7EB',
                                        fontSize: '16px', outline: 'none', transition: 'all 0.2s',
                                        backgroundColor: '#F9FAFB'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#003D29'}
                                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: '100%', padding: '16px',
                                backgroundColor: '#003D29', color: 'white',
                                borderRadius: '50px', fontSize: '16px', fontWeight: '700',
                                border: 'none', cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0, 61, 41, 0.2)',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            Sign In
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '32px', color: '#5F6C72' }}>
                        Don't have an account? {' '}
                        <Link to="/register" style={{ color: '#003D29', fontWeight: '700', textDecoration: 'none' }}>
                            Sign up
                        </Link>
                    </p>
                </motion.div>
            </div>

            {/* Inline Media Query to hide text/image on very small screens if necessary */}
            <style>{`
                @media (max-width: 900px) {
                    .desktop-only-image {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Login;
