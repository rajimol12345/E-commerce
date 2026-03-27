import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaTimes } from 'react-icons/fa';
import api from '../utils/api';
import { toast } from 'react-toastify';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await api.get('/orders');
                setOrders(data);
            } catch (error) {
                toast.error('Failed to fetch orders');
            }
        };
        fetchOrders();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders</h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
                            <th className="p-4 font-semibold">ID</th>
                            <th className="p-4 font-semibold">User</th>
                            <th className="p-4 font-semibold">Date</th>
                            <th className="p-4 font-semibold">Total</th>
                            <th className="p-4 font-semibold">Paid</th>
                            <th className="p-4 font-semibold">Delivered</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-gray-500 text-sm">{order._id}</td>
                                <td className="p-4 font-medium text-gray-800">{order.user && order.user.name}</td>
                                <td className="p-4 text-gray-600">{order.createdAt.substring(0, 10)}</td>
                                <td className="p-4 text-gray-600">${order.totalPrice}</td>
                                <td className="p-4">
                                    {order.isPaid ? (
                                        <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs font-bold">
                                            {order.paidAt.substring(0, 10)}
                                        </span>
                                    ) : (
                                        <span className="text-red-600 bg-red-100 px-2 py-1 rounded text-xs font-bold">No</span>
                                    )}
                                </td>
                                <td className="p-4">
                                    {order.isDelivered ? (
                                        <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs font-bold">
                                            {order.deliveredAt ? order.deliveredAt.substring(0, 10) : 'Yes'}
                                        </span>
                                    ) : (
                                        <span className="text-red-600 bg-red-100 px-2 py-1 rounded text-xs font-bold">No</span>
                                    )}
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${order.status === 'Cancelled' ? 'bg-red-100 text-red-600' :
                                            order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                                                'bg-blue-100 text-blue-600'
                                        }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4 flex space-x-2">
                                    <Link to={`/order/${order._id}`} className="text-indigo-600 hover:text-indigo-800 p-2 rounded hover:bg-indigo-50">
                                        <FaEye />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No orders found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderList;
