import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';
import { motion } from 'framer-motion';

const Deals = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const { data } = await api.get('/products');
                const allProducts = data.products || data || [];
                // Filter products that have a discount or are "on sale" 
                // (assuming any discount > 0 or we can just pick a few for high fidelity)
                const discounted = allProducts.filter(p => (p.discount && p.discount > 0) || p.price < 500);
                setProducts(discounted);
            } catch (error) {
                console.error("Error fetching deals", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDeals();
    }, []);

    return (
        <div style={{ backgroundColor: '#F9F9F9', minHeight: '80vh', padding: '60px 0' }}>
            <div className="container">
                <div style={{
                    backgroundColor: '#003D29',
                    borderRadius: '32px',
                    padding: '60px',
                    marginBottom: '60px',
                    color: 'white',
                    backgroundImage: 'linear-gradient(135deg, #003D29 0%, #005C3E 100%)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h1 style={{ fontSize: '48px', fontWeight: '900', margin: '0 0 16px 0' }}>Today's Best Deals</h1>
                        <p style={{ fontSize: '18px', opacity: 0.9, maxWidth: '500px' }}>
                            Limited time offers on top-quality products. Grab them before they're gone!
                        </p>
                    </div>
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

export default Deals;
