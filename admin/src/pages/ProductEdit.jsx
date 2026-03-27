import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';
import axios from 'axios';

const ProductEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const brandsData = await api.get('/brands');
                setBrands(brandsData.data);
                const categoriesData = await api.get('/categories');
                setCategories(categoriesData.data);

                if (isEditMode) {
                    const { data } = await api.get(`/products/${id}`);
                    setName(data.name);
                    setPrice(data.price);
                    setImage(data.image);
                    setBrand(data.brand?._id || data.brand); // Handle populated or ID
                    setCategory(data.category?._id || data.category);
                    setCountInStock(data.countInStock);
                    setDescription(data.description);
                }
            } catch (error) {
                toast.error('Failed to load data');
            }
        };
        fetchData();
    }, [id, isEditMode]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            const { data } = await api.post('/upload', formData, config);
            setImage(data.image);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
            toast.error('Image upload failed');
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const productData = {
                name,
                price,
                image,
                brand,
                category,
                description,
                countInStock,
            };

            if (isEditMode) {
                await api.put(`/products/${id}`, productData);
                toast.success('Product Updated');
            } else {
                await api.post('/products', productData);
                toast.success('Product Created');
            }
            navigate('/products');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Transaction Failed');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{isEditMode ? 'Edit Product' : 'Add Product'}</h1>
            <div className="card">
                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Product Name</label>
                        <input
                            type="text"
                            className="input-field"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Price</label>
                            <input
                                type="number"
                                className="input-field"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Stock Count</label>
                            <input
                                type="number"
                                className="input-field"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Image</label>
                        <input
                            type="text"
                            className="input-field mb-2"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="Enter image URL"
                            required
                        />
                        <input
                            type="file"
                            onChange={uploadFileHandler}
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100"
                        />
                        {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Brand</label>
                            <select
                                className="input-field"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                required
                            >
                                <option value="">Select Brand</option>
                                {brands.map((b) => (
                                    <option key={b._id} value={b._id}>{b.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Category</label>
                            <select
                                className="input-field"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((c) => (
                                    <option key={c._id} value={c._id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Description</label>
                        <textarea
                            className="input-field h-32"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn-primary w-full py-3">
                        {isEditMode ? 'Update Product' : 'Create Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductEdit;
