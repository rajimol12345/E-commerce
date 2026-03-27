import React, { useState, useEffect } from 'react';
import FormInput from './FormInput';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import '../styles/admin.css';

const ProductForm = ({ product, onSuccess, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image: '',
        brand: '',
        category: '',
        countInStock: '',
        description: '',
        discount: 0,
    });
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                price: product.price || '',
                image: product.image || '',
                brand: product.brand || '',
                category: product.category || '', // This might be ObjectId or String depending on backend. Prompt implies simpler for now.
                countInStock: product.countInStock || 0,
                description: product.description || '',
                discount: product.discount || 0,
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

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
            setFormData(prev => ({ ...prev, image: data.image }));
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
        setLoading(true);

        try {
            if (product?._id) {
                await api.put(`/products/${product._id}`, formData);
                toast.success('Product Updated');
            } else {
                await api.post('/products', formData);
                toast.success('Product Created');
            }
            onSuccess();
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-grid">
                <FormInput
                    label="Product Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label="Brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                />

                <FormInput
                    label="Price ($)"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label="Discount (%)"
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                />

                <FormInput
                    label="Category (ID/Name)"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Electronics or Category ID"
                />
                <FormInput
                    label="Stock Count"
                    type="number"
                    name="countInStock"
                    value={formData.countInStock}
                    onChange={handleChange}
                    required
                />

                <div className="full-width">
                    <label className="form-label">Product Image</label>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Image URL"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            style={{ marginBottom: '10px' }}
                        />
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                        {uploading && <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '10px' }}>Uploading...</span>}
                    </div>
                    {formData.image && (
                        <img
                            src={formData.image.startsWith('http') ? formData.image : `http://localhost:5000${formData.image}`}
                            alt="Preview"
                            style={{ height: '80px', borderRadius: '4px', border: '1px solid #e2e8f0', marginTop: '10px' }}
                        />
                    )}
                </div>

                <div className="full-width">
                    <FormInput
                        label="Description"
                        type="textarea"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                    />
                </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={loading || uploading}>
                    {loading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
                </button>
            </div>
        </form>
    );
};

export default ProductForm;
