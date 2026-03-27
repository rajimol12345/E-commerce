import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Table from '../components/Table';
import Button from '../components/Table'; // Wait, I didn't create Button separately, used classes. I'll just use standard html buttons with classes in Table component context or inline.
import Modal from '../components/Modal';
import ProductForm from '../components/ProductForm';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import { FaPlus, FaSearch } from 'react-icons/fa';
import '../styles/admin.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [keyword, setKeyword] = useState('');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = async (pageNumber = 1, search = '') => {
        try {
            setLoading(true);
            const { data } = await api.get(`/products?pageNumber=${pageNumber}&keyword=${search}`);
            setProducts(data.products);
            console.log("Products Data:", data.products); // Debug log
            setPage(data.page);
            setPages(data.pages);
        } catch (error) {
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(page, keyword);
    }, [page]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchProducts(1, keyword);
    };

    const handleDelete = async (product) => {
        if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
            try {
                await api.delete(`/products/${product._id}`);
                toast.success('Product Deleted');
                fetchProducts(page, keyword);
            } catch (error) {
                toast.error('Delete failed');
            }
        }
    };

    const openAddModal = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const columns = [
        {
            header: 'Image',
            accessor: 'image',
            render: (row) => row.image && <img src={row.image.startsWith('http') ? row.image : `https://e-commerce-jh2x.onrender.com${row.image}`} alt={row.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
        },
        { header: 'Name', accessor: 'name' },
        {
            header: 'Price',
            accessor: 'price',
            render: (row) => `$${row.price}`
        },
        {
            header: 'Category',
            accessor: 'category',
            render: (row) => row.category && row.category.name ? row.category.name : 'N/A'
        },
        {
            header: 'Brand',
            accessor: 'brand',
            render: (row) => row.brand && row.brand.name ? row.brand.name : 'N/A'
        },
        { header: 'Stock', accessor: 'countInStock' },
    ];

    return (
        <div className="admin-layout">
            <Sidebar />
            <main className="main-content">
                <Header title="Products Management" />
                <div className="dashboard-container">

                    <div className="table-header-actions">
                        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search products..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <button type="submit" className="btn btn-secondary"><FaSearch /></button>
                        </form>
                        <button className="btn btn-primary" onClick={openAddModal}>
                            <FaPlus /> Add Product
                        </button>
                    </div>

                    <Table
                        columns={columns}
                        data={products}
                        actions
                        onEdit={openEditModal}
                        onDelete={handleDelete}
                    />

                    {pages > 1 && (
                        <div className="pagination">
                            {[...Array(pages).keys()].map(x => (
                                <button
                                    key={x + 1}
                                    className={`page-btn ${x + 1 === page ? 'active' : ''}`}
                                    onClick={() => setPage(x + 1)}
                                >
                                    {x + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={editingProduct ? "Edit Product" : "Add New Product"}
                >
                    <ProductForm
                        product={editingProduct}
                        onClose={() => setIsModalOpen(false)}
                        onSuccess={() => fetchProducts(page, keyword)}
                    />
                </Modal>
            </main>
        </div>
    );
};

export default Products;
