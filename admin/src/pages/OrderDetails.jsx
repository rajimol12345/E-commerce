import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await api.get(`/orders/${id}`);
                setOrder(data);
            } catch (error) {
                toast.error('Failed to fetch order details');
            }
        };
        fetchOrder();
    }, [id]);

    const deliverHandler = async () => {
        try {
            await api.put(`/orders/${id}/deliver`);
            toast.success('Order Delivered');
            const { data } = await api.get(`/orders/${id}`);
            setOrder(data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
        }
    };

    const statusHandler = async (status) => {
        try {
            await api.put(`/orders/${id}/status`, { status });
            toast.success(`Order status updated to ${status}`);
            const { data } = await api.get(`/orders/${id}`);
            setOrder(data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Status update failed');
        }
    }

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Order {order._id}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="card">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Info</h2>
                    <p><strong>Name:</strong> {order.user.name}</p>
                    <p><strong>Email:</strong> <a href={`mailto:${order.user.email}`} className="text-indigo-600">{order.user.email}</a></p>
                    <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                    <div className={`mt-4 p-3 rounded alert ${order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {order.isDelivered ? `Delivered on ${order.deliveredAt}` : 'Not Delivered'}
                    </div>
                </div>

                <div className="card">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Info</h2>
                    <p><strong>Method:</strong> {order.paymentMethod}</p>
                    <div className={`mt-4 p-3 rounded alert ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {order.isPaid ? `Paid on ${order.paidAt}` : 'Not Paid'}
                    </div>
                    <p className="mt-2"><strong>Status:</strong> {order.status}</p>
                </div>
            </div>

            <div className="card mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Items</h2>
                {order.orderItems.length === 0 ? <p>Order is empty</p> : (
                    <div className="space-y-4">
                        {order.orderItems.map((item, index) => (
                            <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0">
                                <div className="flex items-center">
                                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded mr-4" />
                                    <span className="font-medium text-gray-700">{item.name}</span>
                                </div>
                                <div className="text-gray-600">
                                    {item.qty} x ${item.price} = <span className="font-bold">${item.qty * item.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="card">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Actions</h2>
                <div className="flex flex-wrap gap-4">
                    {!order.isDelivered && (
                        <button onClick={deliverHandler} className="btn-primary">
                            Mark As Delivered
                        </button>
                    )}
                    {order.status !== 'Shipped' && (
                        <button onClick={() => statusHandler('Shipped')} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                            Mark as Shipped
                        </button>
                    )}
                    {order.status !== 'Cancelled' && (
                        <button onClick={() => statusHandler('Cancelled')} className="btn-danger">
                            Cancel Order
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
