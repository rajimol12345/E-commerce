import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';

const CategoryEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            const fetchData = async () => {
                try {
                    const { data } = await api.get(`/categories/${id}`);
                    setName(data.name);
                    setImage(data.image);
                    setDescription(data.description);
                } catch (error) {
                    toast.error('Failed to fetch category data');
                }
            };
            fetchData();
        }
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
            const categoryData = { name, image, description };
            if (isEditMode) {
                await api.put(`/categories/${id}`, categoryData);
                toast.success('Category Updated');
            } else {
                await api.post('/categories', categoryData);
                toast.success('Category Created');
            }
            navigate('/categories');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Transaction Failed');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{isEditMode ? 'Edit Category' : 'Add Category'}</h1>
            <div className="card">
                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Category Name</label>
                        <input
                            type="text"
                            className="input-field"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
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
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Description</label>
                        <textarea
                            className="input-field h-32"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn-primary w-full py-3">
                        {isEditMode ? 'Update Category' : 'Create Category'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CategoryEdit;
