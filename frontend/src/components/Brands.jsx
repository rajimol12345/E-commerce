import React from 'react';

const Brands = () => {
    const brands = [
        { name: 'Staples', sub: 'Delivery with in 24 hours', logo: 'https://e-commerce-jh2x.onrender.com/images/Brand-Staples.png' },
        { name: 'Sprouts', sub: 'Delivery with in 24 hours', logo: 'https://e-commerce-jh2x.onrender.com/images/Brand-Sprouts.png' },
        { name: 'Grocery outlet', sub: 'Delivery with in 24 hours', logo: 'https://e-commerce-jh2x.onrender.com/images/Brand-Grocery.png' },
        { name: 'Mollie stones', sub: 'Delivery with in 24 hours', logo: 'https://e-commerce-jh2x.onrender.com/images/Brand-Mollie.png' },
        { name: 'Sports Basement', sub: 'Delivery with in 24 hours', logo: 'https://e-commerce-jh2x.onrender.com/images/Brand-Sports.png' },
        { name: 'Container Store', sub: 'Delivery with in 24 hours', logo: 'https://e-commerce-jh2x.onrender.com/images/Brand-Container.png' },
        { name: 'Target', sub: 'Delivery with in 24 hours', logo: 'https://e-commerce-jh2x.onrender.com/images/Brand-Target.png' },
        { name: 'Bevmo!', sub: 'Delivery with in 24 hours', logo: 'https://e-commerce-jh2x.onrender.com/images/Brand-Bevmo.png' },
    ];

    return (
        <section className="section" style={{ backgroundColor: 'white', padding: '80px 0' }}>
            <div className="container">
                <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '40px', color: '#231F1E' }}>Choose By Brand</h2>

                <div className="grid-4">
                    {brands.map((brand, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#F5F6F6',
                                padding: '24px',
                                borderRadius: '12px',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                border: '1px solid transparent'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)';
                                e.currentTarget.style.backgroundColor = 'white';
                                e.currentTarget.style.borderColor = '#F0F0F0';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.backgroundColor = '#F5F6F6';
                                e.currentTarget.style.borderColor = 'transparent';
                            }}
                        >
                            <div style={{ flexShrink: 0, marginRight: '20px', width: '50px', height: '50px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 4px 0', color: '#231F1E' }}>{brand.name}</h4>
                                <p style={{ fontSize: '14px', margin: 0, color: '#231F1E', opacity: 0.7, lineHeight: '1.4' }}>{brand.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Brands;
