import React from 'react';
import { FaShoppingCart, FaMoneyBillWave, FaUsers, FaBox } from 'react-icons/fa';

const Dashboard = () => {
    const stats = [
        { label: 'Total Sales', value: '$12,345', icon: <FaMoneyBillWave />, color: 'bg-green-100 text-green-600' },
        { label: 'Total Orders', value: '150', icon: <FaShoppingCart />, color: 'bg-blue-100 text-blue-600' },
        { label: 'Total Products', value: '45', icon: <FaBox />, color: 'bg-purple-100 text-purple-600' },
        { label: 'Total Users', value: '320', icon: <FaUsers />, color: 'bg-orange-100 text-orange-600' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="card flex items-center">
                        <div className={`p-4 rounded-full ${stat.color} mr-4 text-2xl`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-gray-500 font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card h-96">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Sales Analytics</h2>
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Chart Component Here
                    </div>
                </div>
                <div className="card h-96">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h2>
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Orders Table Here
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
