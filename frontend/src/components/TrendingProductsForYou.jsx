import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TrendingProductsForYou = () => {
    const items = [
        {
            id: 1,
            title: 'Furniture Village',
            subtitle: 'Delivery with in 24 hours',
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80', // Green Sofa
            link: '/shop?category=furniture',
            bgColor: '#F9F9F9'
        },
        {
            id: 2,
            title: 'Fashion World',
            subtitle: 'Delivery with in 24 hours',
            image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80', // Clothing Rack
            link: '/shop?category=fashion',
            bgColor: '#F9F9F9'
        }
    ];

    return (
        <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
            <div className="container">
                <h2 style={{
                    fontSize: '28px',
                    fontWeight: '800',
                    color: '#231F1E',
                    marginBottom: '40px'
                }}>
                    Trending Products For You!
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '32px'
                }}>
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="trending-for-you-card"
                            style={{
                                backgroundColor: item.bgColor,
                                borderRadius: '24px',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {/* Image Section - Takes top half */}
                            <div style={{
                                height: '350px',
                                overflow: 'hidden',
                                position: 'relative'
                            }}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.4s ease'
                                    }}
                                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                />
                            </div>

                            {/* Content Section - Bottom */}
                            <div style={{ padding: '32px' }}>
                                <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#231F1E', marginBottom: '8px' }}>
                                    {item.title}
                                </h3>
                                <p style={{ fontSize: '16px', color: '#5F6C72', marginBottom: '24px' }}>
                                    {item.subtitle}
                                </p>
                                <Link
                                    to={item.link}
                                    className="btn btn-primary"
                                    style={{
                                        borderRadius: '50px',
                                        padding: '12px 32px',
                                        backgroundColor: '#231F1E', // Black button per reference
                                        color: 'white',
                                        fontWeight: '600'
                                    }}
                                >
                                    Shop Now
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <style>{`
                @media (max-width: 768px) {
                    .trending-for-you-card img {
                        height: 250px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default TrendingProductsForYou;
