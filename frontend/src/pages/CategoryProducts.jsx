import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';
import { FaArrowLeft, FaShoppingBag } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CategoryProducts = () => {
    const { name: categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Fetch all products and filter by category name
                const { data } = await api.get('/products');
                const allProducts = data.products || data || [];

                const filtered = allProducts.filter(p =>
                    (p.category?.name || p.category) === categoryName
                );

                setProducts(filtered);
            } catch (error) {
                console.error("Error fetching category products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [categoryName]);

    return (
        <div style={{ backgroundColor: '#F9F9F9', minHeight: '80vh', padding: '60px 0' }}>
            <div className="container">

                {/* Header Section */}
                <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <Link to="/shop" style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            color: '#5F6C72', textDecoration: 'none', fontWeight: '600',
                            fontSize: '14px', marginBottom: '16px'
                        }}>
                            <FaArrowLeft size={12} />
                            Back to Shop
                        </Link>
                        <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#231F1E', margin: 0 }}>
                            {categoryName}
                        </h1>
                        <p style={{ color: '#777E90', marginTop: '8px' }}>
                            Showing {products.length} products in this category
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
                        <div className="loader">Loading...</div>
                    </div>
                ) : products.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '30px'
                        }}
                    >
                        {products.map(p => <ProductCard key={p._id} product={p} />)}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            textAlign: 'center',
                            padding: '100px 0',
                            backgroundColor: 'white',
                            borderRadius: '32px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
                        }}
                    >
                        <div style={{ color: '#E6E8EC', marginBottom: '24px' }}>
                            <FaShoppingBag size={64} />
                        </div>
                        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#231F1E', marginBottom: '16px' }}>
                            No products found
                        </h2>
                        <p style={{ color: '#5F6C72', marginBottom: '32px' }}>
                            We couldn't find any products in the "{categoryName}" category right now.
                        </p>
                        <Link to="/shop" className="btn btn-primary" style={{ padding: '16px 40px', borderRadius: '50px' }}>
                            Explore Other Categories
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CategoryProducts;
