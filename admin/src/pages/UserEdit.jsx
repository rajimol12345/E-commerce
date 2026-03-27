import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';

const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await api.get(`/users/${id}`);
                setName(data.name);
                setEmail(data.email);
                setIsAdmin(data.isAdmin); // or data.role === 'admin' depending on backend
            } catch (error) {
                toast.error('Failed to load user');
            }
        };
        fetchUser();
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/users/${id}`, { name, email, isAdmin });
            toast.success('User Updated');
            navigate('/users');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit User</h1>
            <div className="card">
                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Name</label>
                        <input
                            type="text"
                            className="input-field"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-gray-700 font-medium">Is Admin</label>
                    </div>
                    <button type="submit" className="btn-primary w-full py-3">
                        Update User
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserEdit;
