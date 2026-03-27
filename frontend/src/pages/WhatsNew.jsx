import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';
import { motion } from 'framer-motion';

const WhatsNew = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNew = async () => {
            try {
                const { data } = await api.get('/products');
                const allProducts = data.products || data || [];
                // Sort by createdAt (assuming it exists in DB) descending
                const sorted = [...allProducts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
                setProducts(sorted);
            } catch (error) {
                console.error("Error fetching new products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNew();
    }, []);

    return (
        <div style={{ backgroundColor: '#F9F9F9', minHeight: '80vh', padding: '60px 0' }}>
            <div className="container">
                <div style={{ marginBottom: '60px' }}>
                    <h1 style={{ fontSize: '42px', fontWeight: '800', color: '#231F1E', marginBottom: '16px' }}>What's New</h1>
                    <p style={{ color: '#777E90', fontSize: '18px' }}>
                        Fresh arrivals, just for you. Stay ahead with our latest products.
                    </p>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '100px 0' }}>Loading...</div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '30px'
                    }}>
                        {products.map(p => <ProductCard key={p._id} product={p} />)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WhatsNew;
