import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import api from '../utils/api';
import { toast } from 'react-toastify';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/categories');
            setCategories(data);
        } catch (error) {
            toast.error('Failed to fetch categories');
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await api.delete(`/categories/${id}`);
                toast.success('Category Deleted');
                fetchCategories();
            } catch (error) {
                toast.error('Failed to delete category');
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
                <Link to="/category/add" className="btn-primary">
                    <FaPlus className="mr-2" /> Add Category
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
                            <th className="p-4 font-semibold">ID</th>
                            <th className="p-4 font-semibold">Image</th>
                            <th className="p-4 font-semibold">Name</th>
                            <th className="p-4 font-semibold">Description</th>
                            <th className="p-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-gray-500 text-sm">{category._id}</td>
                                <td className="p-4">
                                    <img src={category.image} alt={category.name} className="w-12 h-12 object-cover rounded" />
                                </td>
                                <td className="p-4 font-medium text-gray-800">{category.name}</td>
                                <td className="p-4 text-gray-600 truncate max-w-xs">{category.description || '-'}</td>
                                <td className="p-4 flex space-x-2">
                                    <Link to={`/category/${category._id}/edit`} className="text-indigo-600 hover:text-indigo-800 p-2 rounded hover:bg-indigo-50">
                                        <FaEdit />
                                    </Link>
                                    <button
                                        onClick={() => deleteHandler(category._id)}
                                        className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {categories.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No categories found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryList;
