import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Table from '../components/Table';
import Modal from '../components/Modal';
import FormInput from '../components/FormInput';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import '../styles/admin.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [name, setName] = useState('');
    const [image, setImage] = useState(''); // Text input for URL for now, could upgrade to upload if needed

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/categories');
            setCategories(data);
        } catch (error) {
            toast.error('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append('image', file);
        setUploading(true);

        try {
            const { data } = await api.post('/upload', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setImage(data.image);
            toast.success('Image uploaded successfully');
        } catch (error) {
            toast.error('Image upload failed');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await api.put(`/categories/${editingCategory._id}`, { name, image });
                toast.success('Category Updated');
            } else {
                await api.post('/categories', { name, image });
                toast.success('Category Created');
            }
            setIsModalOpen(false);
            fetchCategories();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (cat) => {
        if (window.confirm(`Delete category ${cat.name}?`)) {
            try {
                await api.delete(`/categories/${cat._id}`);
                toast.success('Category Deleted');
                fetchCategories();
            } catch (error) {
                toast.error('Delete failed');
            }
        }
    };

    const openAddModal = () => {
        setEditingCategory(null);
        setName('');
        setImage('');
        setIsModalOpen(true);
    };

    const openEditModal = (cat) => {
        setEditingCategory(cat);
        setName(cat.name);
        setImage(cat.image || '');
        setIsModalOpen(true);
    };

    const columns = [
        { header: 'Image', accessor: 'image', render: (row) => row.image ? <img src={row.image.startsWith('http') ? row.image : `https://e-commerce-jh2x.onrender.com${row.image}`} alt={row.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /> : 'No Image' },
        { header: 'Name', accessor: 'name' },
        { header: 'ID', accessor: '_id' },
    ];

    return (
        <div className="admin-layout">
            <Sidebar />
            <main className="main-content">
                <Header title="Categories" />
                <div className="dashboard-container">
                    <div className="table-header-actions">
                        <h3>All Categories</h3>
                        <button className="btn btn-primary" onClick={openAddModal}>
                            <FaPlus /> Add Category
                        </button>
                    </div>

                    <Table
                        columns={columns}
                        data={categories}
                        actions
                        onEdit={openEditModal}
                        onDelete={handleDelete}
                    />
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={editingCategory ? "Edit Category" : "Add Category"}
                >
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            label="Category Name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <div className="form-group">
                            <label className="form-label">Category Image</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Image URL"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                style={{ marginBottom: '10px' }}
                            />
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            {uploading && <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '10px' }}>Uploading...</span>}

                            {image && (
                                <div style={{ marginTop: '10px' }}>
                                    <img
                                        src={image.startsWith('http') ? image : `https://e-commerce-jh2x.onrender.com${image}`}
                                        alt="Preview"
                                        style={{ height: '60px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = '<span style="color: #ef4444; font-size: 12px;">⚠️ Image not found. Please upload a new image.</span>';
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button type="submit" className="btn btn-primary" disabled={uploading}>Save</button>
                        </div>
                    </form>
                </Modal>
            </main>
        </div>
    );
};

export default Categories;
