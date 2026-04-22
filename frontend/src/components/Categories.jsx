import React from 'react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
    const navigate = useNavigate();

    const categories = [
        { name: 'Furniture', image: 'https://e-commerce-jh2x.onrender.com/images/Cat-Furniture.png', color: '#3E6553' },
        { name: 'Hand Bag', image: 'https://e-commerce-jh2x.onrender.com/images/Cat-HandBag.png', color: '#FDB851' },
        { name: 'Books', image: 'https://e-commerce-jh2x.onrender.com/images/Cat-Books.png', color: '#C34C41' },
        { name: 'Tech', image: 'https://e-commerce-jh2x.onrender.com/images/Cat-Tech.png', color: '#38AE73' },
        { name: 'Sneakers', image: 'https://e-commerce-jh2x.onrender.com/images/Cat-Sneakers.png', color: '#F498A6' },
        { name: 'Travel', image: 'https://e-commerce-jh2x.onrender.com/images/Cat-Travel.png', color: '#FDB241' },
    ];

    return (
        <section className="section" style={{ paddingBottom: '80px' }}>
            <div className="container">
                <h2 style={{ marginBottom: '40px', fontSize: '24px', fontWeight: '700' }}>Shop Our Top Categories</h2>

                <div className="grid-6">
                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/category/${cat.name}`)}
                            style={{
                                cursor: 'pointer',
                                position: 'relative',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                backgroundColor: cat.color,
                                height: '260px', /* Taller for vertical layout */
                                transition: 'transform 0.3s ease',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                            }}
                            className="scale-on-hover"
                        >
                            {/* Title (Absolute Top) */}
                            <h3 style={{
                                position: 'absolute',
                                top: '25px',
                                width: '100%',
                                textAlign: 'center',
                                color: 'white',
                                margin: 0,
                                fontSize: '18px',
                                fontWeight: '700',
                                zIndex: 10,
                                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}>
                                {cat.name}
                            </h3>

                            {/* Image (Bottom Aligned) */}
                            <img
                                src={cat.image}
                                alt={cat.name}
                                style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    left: '0',
                                    width: '100%',
                                    height: '75%', /* Occupy bottom 3/4 */
                                    objectFit: 'contain',
                                    objectPosition: 'bottom center',
                                    zIndex: 1
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
