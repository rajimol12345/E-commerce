import React from 'react';

const Brands = () => {
    const brands = [
        { name: 'Staples', sub: 'Delivery with in 24 hours', logo: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e560afc2c49da53521_brand%20(3)-min.png' },
        { name: 'Sprouts', sub: 'Delivery with in 24 hours', logo: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e58b497e41aa46b801_brand%20(8)-min.png' },
        { name: 'Grocery outlet', sub: 'Delivery with in 24 hours', logo: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e5eaf8533b0958cefe_brand%20(5)-min.png' },
        { name: 'Mollie stones', sub: 'Delivery with in 24 hours', logo: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e454ac2e9d497cb531_brand%20(6)-min.png' },
        { name: 'Sports Basement', sub: 'Delivery with in 24 hours', logo: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e4707380971125e685_brand%20(4)-min.png' },
        { name: 'Container Store', sub: 'Delivery with in 24 hours', logo: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e460afc2193aa53511_brand%20(2)-min.png' },
        { name: 'Target', sub: 'Delivery with in 24 hours', logo: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e4c21faa5e03c209c5_brand%20(1)-min.png' },
        { name: 'Bevmo!', sub: 'Delivery with in 24 hours', logo: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e51eb4ad92a3e75673_brand%20(7)-min.png' },
    ];

    return (
        <section className="section" style={{ backgroundColor: 'white', padding: '80px 0' }}>
            <div className="container">
                <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '40px', color: '#231F1E' }}>Choose By Brand</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
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
