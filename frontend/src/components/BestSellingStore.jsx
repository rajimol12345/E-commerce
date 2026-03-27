import React from 'react';
import { Link } from 'react-router-dom';
import { FaTag } from 'react-icons/fa';
import storeStaples from '../assets/store-staples.png';
import storeNow from '../assets/store-now.png';
import storeBevmo from '../assets/store-bevmo.png';
import storeQuicklly from '../assets/store-quicklly.png';

const BestSellingStore = () => {
    const stores = [
        {
            id: 1,
            name: 'Staples',
            category: 'Bag • Perfume',
            deliveryTime: 'Delivery with in 24 hours',
            image: storeStaples,
            backgroundColor: '#FFD4D4', // Pastel pink bg for image
            badge: 'Staples',
            badgeColor: '#E31E24' // Red badge
        },
        {
            id: 2,
            name: 'Now Delivery',
            category: 'Bag • Perfume',
            deliveryTime: 'Delivery with in 24 hours',
            image: storeNow,
            backgroundColor: '#FFE5E5', // Light red bg
            badge: 'Now',
            badgeColor: '#0C68F4' // Blue badge
        },
        {
            id: 3,
            name: 'Bevmo',
            category: 'Bag • Perfume',
            deliveryTime: 'Delivery with in 24 hours',
            image: storeBevmo,
            backgroundColor: '#D4F4DD', // Light green bg
            badge: 'BevMo!',
            badgeColor: '#E31E24' // Red badge
        },
        {
            id: 4,
            name: 'Quicklly',
            category: 'Bag • Perfume',
            deliveryTime: 'Delivery with in 24 hours',
            image: storeQuicklly,
            backgroundColor: '#FFE8D4', // Light orange bg
            badge: 'Q',
            badgeColor: '#00A67E' // Green badge
        }
    ];

    return (
        <section style={{
            padding: '80px 0',
            backgroundColor: 'white'
        }}>
            <div className="container">
                <h2 style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    marginBottom: '40px',
                    color: '#23262F'
                }}>
                    Best Selling Store
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', // Responsive 4 columns
                    gap: '32px'
                }}>
                    {stores.map(store => (
                        <Link
                            key={store.id}
                            to={`/shop?store=${store.name}`}
                            style={{
                                textDecoration: 'none',
                                display: 'block',
                                position: 'relative'
                            }}
                        >
                            {/* Image Container */}
                            <div style={{
                                backgroundColor: store.backgroundColor,
                                borderRadius: '16px',
                                overflow: 'hidden',
                                height: '220px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                marginBottom: '28px' // Space for overlapping badge
                            }}>
                                <img
                                    src={store.image}
                                    alt={store.name}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain'
                                    }}
                                />

                                {/* Badge Overlapping Bottom Left */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-20px', // Pull down to overlap
                                    left: '20px',
                                    width: '56px',
                                    height: '56px',
                                    backgroundColor: store.badgeColor,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: '700',
                                    fontSize: '12px',
                                    border: '4px solid white', // White border to separate from image
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                    zIndex: 2
                                }}>
                                    {store.badge === 'Now' ? <span style={{ fontSize: '10px' }}>Now<br />Delivery</span> : store.badge === 'Quicklly' ? 'Q' : store.badge}
                                </div>
                            </div>

                            {/* Store Info */}
                            <div>
                                <h3 style={{
                                    fontSize: '20px',
                                    fontWeight: '800',
                                    color: '#23262F',
                                    marginBottom: '6px'
                                }}>
                                    {store.name}
                                </h3>
                                <p style={{
                                    fontSize: '14px',
                                    color: '#777E90',
                                    marginBottom: '10px'
                                }}>
                                    {store.category}
                                </p>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '13px',
                                    color: '#EA4C89', // Pinkish color from reference
                                    fontWeight: '500'
                                }}>
                                    <FaTag style={{ fontSize: '12px' }} />
                                    {store.deliveryTime}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BestSellingStore;
