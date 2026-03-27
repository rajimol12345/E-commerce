import React from 'react';
import { FaTruck, FaGlobeAmericas, FaShieldAlt, FaClock } from 'react-icons/fa';

const Delivery = () => {
    const features = [
        { icon: <FaTruck />, title: 'Fast Shipping', desc: 'Get your products delivered within 3-5 business days across the country.' },
        { icon: <FaGlobeAmericas />, title: 'Global Delivery', desc: 'We ship to over 50 countries worldwide with reliable international partners.' },
        { icon: <FaShieldAlt />, title: 'Secure Handling', desc: 'Every package is handled with extreme care and insured for its full value.' },
        { icon: <FaClock />, title: 'Real-time Tracking', desc: 'Stay updated with precise tracking alerts from warehouse to your doorstep.' }
    ];

    return (
        <div style={{ backgroundColor: '#F9F9F9', minHeight: '80vh', padding: '80px 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#231F1E', marginBottom: '20px' }}>Delivery Information</h1>
                    <p style={{ color: '#777E90', fontSize: '20px', maxWidth: '700px', margin: '0 auto' }}>
                        Everything you need to know about how we get your favorite products to you.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '40px',
                    marginBottom: '80px'
                }}>
                    {features.map((f, i) => (
                        <div key={i} style={{
                            backgroundColor: 'white',
                            padding: '40px',
                            borderRadius: '32px',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                fontSize: '32px',
                                color: '#003D29',
                                marginBottom: '24px',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                {f.icon}
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>{f.title}</h3>
                            <p style={{ color: '#5F6C72', lineHeight: '1.6' }}>{f.desc}</p>
                        </div>
                    ))}
                </div>

                <div style={{
                    backgroundColor: '#003D29',
                    borderRadius: '40px',
                    padding: '80px',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '60px',
                    flexWrap: 'wrap'
                }}>
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '24px' }}>Free Delivery for Orders over $100</h2>
                        <p style={{ fontSize: '18px', opacity: 0.8, lineHeight: '1.6' }}>
                            Shop more and save on shipping! We offer free standard delivery on all orders exceeding $100.
                        </p>
                    </div>
                    <button style={{
                        padding: '20px 48px',
                        backgroundColor: 'white',
                        color: '#003D29',
                        border: 'none',
                        borderRadius: '50px',
                        fontSize: '18px',
                        fontWeight: '700',
                        cursor: 'pointer'
                    }}>
                        Check FAQ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Delivery;
