import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Table from '../components/Table';
import StatusBadge from '../components/StatusBadge';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import '../styles/admin.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/users');
            setUsers(data);
        } catch (error) {
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const currentUser = JSON.parse(localStorage.getItem('userInfo')) || {};

    const handleRoleChange = async (user, newRole) => {
        if (newRole === user.role) return;

        if (window.confirm(`Are you sure you want to change ${user.name}'s role to ${newRole}?`)) {
            try {
                await api.put(`/users/${user._id}`, { role: newRole });
                toast.success(`Role updated to ${newRole}`);
                fetchUsers();
            } catch (error) {
                toast.error(error.response?.data?.message || 'Update failed');
            }
        } else {
            // Revert selection if cancelled (force re-render or just ignore since state comes from props/fetch)
            fetchUsers();
        }
    };

    const handleDelete = async (user) => {
        if (user._id === currentUser._id) {
            toast.error("You cannot delete yourself");
            return;
        }
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
            try {
                await api.delete(`/users/${user._id}`);
                toast.success('User Deleted');
                fetchUsers();
            } catch (error) {
                toast.error('Delete failed');
            }
        }
    };

    const columns = [
        { header: 'ID', accessor: '_id' },
        { header: 'Name', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        {
            header: 'Role',
            accessor: 'role',
            render: (row) => (
                <select
                    className="form-select"
                    value={row.role}
                    onChange={(e) => handleRoleChange(row, e.target.value)}
                    disabled={row._id === currentUser._id}
                    style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: row._id === currentUser._id ? '#f1f5f9' : 'white',
                        cursor: row._id === currentUser._id ? 'not-allowed' : 'pointer'
                    }}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            )
        },
        { header: 'Status', accessor: 'role', render: (row) => <StatusBadge status={row.role === 'admin' ? 'Admin' : 'Active'} /> },
    ];

    return (
        <div className="admin-layout">
            <Sidebar />
            <main className="main-content">
                <Header title="Users Management" />
                <div className="dashboard-container">
                    <Table
                        columns={columns}
                        data={users}
                        actions
                        onDelete={handleDelete}
                    />
                </div>
            </main>
        </div>
    );
};

export default Users;
