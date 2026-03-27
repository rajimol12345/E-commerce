import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import { FaShoppingCart, FaDollarSign, FaUsers, FaBoxOpen } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../utils/api';
import '../styles/admin.css';


const Layout = ({ children, title }) => (
    <div className="admin-layout">
        <Sidebar />
        <main className="main-content">
            <Header title={title} />
            <div className="dashboard-container">
                {children}
            </div>
        </main>
    </div>
);

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const { data } = await api.get('/dashboard');
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
                if (error.response && error.response.status === 401) {
                    // Token expired or invalid
                    localStorage.removeItem('userInfo');
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate]);

    if (loading) {
        return (
            <Layout title="Dashboard Overview">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                    <p>Loading Dashboard Stats...</p>
                </div>
            </Layout>
        );
    }

    const statCards = [
        { title: 'Total Revenue', value: `$${stats?.totalSales?.toLocaleString() || 0}`, icon: <FaDollarSign /> },
        { title: 'Total Orders', value: stats?.totalOrders || 0, icon: <FaShoppingCart /> },
        { title: 'Total Products', value: stats?.totalProducts || 0, icon: <FaBoxOpen /> },
        { title: 'Total Users', value: stats?.totalUsers || 0, icon: <FaUsers /> },
    ];

    // Format chart data from monthlySales or dailySales
    const chartData = stats?.monthlySales?.map(item => ({
        name: item._id, // Format like "2023-10"
        sales: item.totalSales
    })) || [];

    return (
        <Layout title="Dashboard Overview">
            <div className="stats-grid">
                {statCards.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))', gap: '24px' }}>

                {/* Chart Section */}
                <div style={{
                    background: 'white',
                    padding: '24px',
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-card)',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden' // Ensure content doesn't overflow
                }}>
                    <h3 style={{ marginBottom: '20px', color: '#1c2434' }}>Monthly Revenue Analytics</h3>
                    <div style={{ width: '100%', height: 300, minWidth: 0 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Area type="monotone" dataKey="sales" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.1} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Orders Section */}
                <div style={{
                    background: 'white',
                    padding: '24px',
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-card)',
                    border: '1px solid var(--border-color)'
                }}>
                    <h3 style={{ marginBottom: '20px', color: '#1c2434' }}>Recent Orders</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left' }}>
                                <th style={{ padding: '12px', fontSize: '14px', color: '#64748b' }}>Order ID</th>
                                <th style={{ padding: '12px', fontSize: '14px', color: '#64748b' }}>Customer</th>
                                <th style={{ padding: '12px', fontSize: '14px', color: '#64748b' }}>Status</th>
                                <th style={{ padding: '12px', fontSize: '14px', color: '#64748b' }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats?.recentOrders?.map((order, idx) => (
                                <tr key={order._id} style={{ borderBottom: '1px solid #f8f9fa' }}>
                                    <td style={{ padding: '12px', fontSize: '14px', color: '#1c2434' }}>#{order._id.substring(0, 8)}</td>
                                    <td style={{ padding: '12px', fontSize: '14px', color: '#1c2434' }}>{order.user?.name || 'Guest'}</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '50px',
                                            fontSize: '12px',
                                            fontWeight: '500',
                                            background: order.isDelivered ? '#dafbe1' : order.isPaid ? '#e1effe' : '#fef3c7',
                                            color: order.isDelivered ? '#1f9d55' : order.isPaid ? '#3f83f8' : '#d97706'
                                        }}>
                                            {order.isDelivered ? 'Delivered' : order.isPaid ? 'Paid' : 'Pending'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', fontSize: '14px', color: '#1c2434' }}>${order.totalPrice}</td>
                                </tr>
                            ))}
                            {(!stats?.recentOrders || stats.recentOrders.length === 0) && (
                                <tr>
                                    <td colSpan="4" style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>No recent orders found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </Layout>
    );
};

export default Dashboard;
