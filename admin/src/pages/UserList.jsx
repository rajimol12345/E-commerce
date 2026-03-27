import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import api from '../utils/api';
import { toast } from 'react-toastify';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/users');
            setUsers(data);
        } catch (error) {
            toast.error('Failed to fetch users');
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await api.delete(`/users/${id}`);
                toast.success('User Deleted');
                fetchUsers();
            } catch (error) {
                toast.error('Failed to delete user');
            }
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Users</h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
                            <th className="p-4 font-semibold">ID</th>
                            <th className="p-4 font-semibold">Name</th>
                            <th className="p-4 font-semibold">Email</th>
                            <th className="p-4 font-semibold">Admin</th>
                            <th className="p-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-gray-500 text-sm">{user._id}</td>
                                <td className="p-4 font-medium text-gray-800">{user.name}</td>
                                <td className="p-4 text-indigo-600"><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td className="p-4">
                                    {user.isAdmin ? (
                                        <FaCheck className="text-green-500" />
                                    ) : (
                                        <FaTimes className="text-red-500" />
                                    )}
                                </td>
                                <td className="p-4 flex space-x-2">
                                    <Link to={`/user/${user._id}/edit`} className="text-indigo-600 hover:text-indigo-800 p-2 rounded hover:bg-indigo-50">
                                        <FaEdit />
                                    </Link>
                                    <button
                                        onClick={() => deleteHandler(user._id)}
                                        className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
