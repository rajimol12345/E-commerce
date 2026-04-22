import React from 'react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
    const navigate = useNavigate();

    const categories = [
        { name: 'Furniture', image: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e570738029a725e686_Furniture-min.png', color: '#3E6553' },
        { name: 'Hand Bag', image: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e52d6553668075697e_hand%20bag-min.png', color: '#FDB851' },
        { name: 'Books', image: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e460afc22b7ea53520_books-min.png', color: '#C34C41' },
        { name: 'Tech', image: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e754ac2e32897cb53b_tech-min.png', color: '#38AE73' },
        { name: 'Sneakers', image: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e64b769118272f244f_sneakers-min.png', color: '#F498A6' },
        { name: 'Travel', image: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e71eb4ad6d07e7568f_travel-min.png', color: '#FDB241' },
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
