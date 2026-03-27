import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Table from '../components/Table';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import '../styles/admin.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewOrder, setViewOrder] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/orders');
            setOrders(data);
        } catch (error) {
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const markAsDelivered = async (id) => {
        try {
            await api.put(`/orders/${id}/deliver`);
            toast.success('Order Marked as Delivered');
            setViewOrder(null);
            fetchOrders();
        } catch (error) {
            toast.error('Update failed');
        }
    };

    const columns = [
        { header: 'Order ID', accessor: '_id' },
        { header: 'User', accessor: 'user', render: (row) => row.user ? row.user.name : 'Unknown' },
        { header: 'Date', accessor: 'createdAt', render: (row) => new Date(row.createdAt).toLocaleDateString() },
        { header: 'Total', accessor: 'totalPrice', render: (row) => `$${row.totalPrice}` },
        { header: 'Paid', accessor: 'isPaid', render: (row) => <StatusBadge status={row.isPaid ? 'Paid' : 'Pending'} /> },
        { header: 'Delivered', accessor: 'isDelivered', render: (row) => <StatusBadge status={row.isDelivered ? 'Delivered' : 'Processing'} /> },
    ];

    return (
        <div className="admin-layout">
            <Sidebar />
            <main className="main-content">
                <Header title="Orders Management" />
                <div className="dashboard-container">
                    <Table
                        columns={columns}
                        data={orders}
                        actions
                        onView={(order) => setViewOrder(order)}
                    />
                </div>

                {viewOrder && (
                    <Modal
                        isOpen={!!viewOrder}
                        onClose={() => setViewOrder(null)}
                        title={`Order Details: ${viewOrder._id}`}
                    >
                        <div style={{ padding: '0 10px' }}>
                            <h4>Shipping Info</h4>
                            <p><strong>Name:</strong> {viewOrder.user?.name}</p>
                            <p><strong>Email:</strong> {viewOrder.user?.email}</p>
                            <p><strong>Address:</strong> {viewOrder.shippingAddress?.address}, {viewOrder.shippingAddress?.city}, {viewOrder.shippingAddress?.country}</p>

                            <h4 style={{ marginTop: '20px' }}>Order Items</h4>
                            <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px' }}>
                                {viewOrder.orderItems.map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '8px 0' }}>
                                        <span>{item.name} (x{item.qty})</span>
                                        <span>${item.price * item.qty}</span>
                                    </div>
                                ))}
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontWeight: 'bold' }}>
                                    <span>Total:</span>
                                    <span>${viewOrder.totalPrice}</span>
                                </div>
                            </div>

                            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                                {!viewOrder.isDelivered && (
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => markAsDelivered(viewOrder._id)}
                                    >
                                        Mark as Delivered
                                    </button>
                                )}
                                {viewOrder.isDelivered && <span className="status-badge status-success">Order Completed</span>}
                            </div>
                        </div>
                    </Modal>
                )}
            </main>
        </div>
    );
};

export default Orders;
