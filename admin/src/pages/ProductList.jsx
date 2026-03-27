import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import api from '../utils/api';
import { toast } from 'react-toastify';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products');
            setProducts(data.products || data); // Handle pagination structure if exists
        } catch (error) {
            toast.error('Failed to fetch products');
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                toast.success('Product Deleted');
                fetchProducts();
            } catch (error) {
                toast.error('Failed to delete product');
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                <Link to="/product/add" className="btn-primary">
                    <FaPlus className="mr-2" /> Add Product
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
                            <th className="p-4 font-semibold">ID</th>
                            <th className="p-4 font-semibold">Name</th>
                            <th className="p-4 font-semibold">Price</th>
                            <th className="p-4 font-semibold">Category</th>
                            <th className="p-4 font-semibold">Brand</th>
                            <th className="p-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-gray-500 text-sm">{product._id}</td>
                                <td className="p-4 font-medium text-gray-800">{product.name}</td>
                                <td className="p-4 text-gray-600">${product.price}</td>
                                <td className="p-4 text-gray-600">{product.category?.name || 'N/A'}</td>
                                <td className="p-4 text-gray-600">{product.brand?.name || 'N/A'}</td>
                                <td className="p-4 flex space-x-2">
                                    <Link to={`/product/${product._id}/edit`} className="text-indigo-600 hover:text-indigo-800 p-2 rounded hover:bg-indigo-50">
                                        <FaEdit />
                                    </Link>
                                    <button
                                        onClick={() => deleteHandler(product._id)}
                                        className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {products.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No products found. Start by adding one!
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
