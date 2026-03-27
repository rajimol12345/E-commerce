import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../utils/api'; // Adjusted import path
import { toast } from 'react-toastify';
import '../styles/auth.css'; // Import new Auth CSS

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log('Admin login attempt for:', email);
        
        try {
            // Updated endpoint to use UNIFIED User Auth
            const { data } = await api.post('/users/login', { email, password }, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('Admin login response:', data);

            // detailed check for admin role
            if (data.role === 'admin' || data.isAdmin) {
                localStorage.setItem('userInfo', JSON.stringify(data));
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }
                toast.success('Welcome back, Admin!');
                navigate('/dashboard');
            } else {
                toast.error('Access Denied: Admins Only');
            }
        } catch (error) {
            console.error('Admin login error:', error);
            const msg = error.response?.data?.message || 'Invalid Email or Password';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2 className="auth-title">Admin Login</h2>
                    <p className="auth-subtitle">Sign in to manage your e-commerce store</p>
                </div>

                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="admin@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className="auth-footer">
                    Don't have an account?
                    <Link to="/register" className="auth-link">Register New Admin</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
