import React from 'react';

const PromoGrid = () => {
    const promos = [
        {
            save: 100,
            bg: '#F5E6E0', // Beige
            priceColor: '#D4A017', // Gold
            img: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e6cd367817e964f756_sofa-min.png'
        },
        {
            save: 29,
            bg: '#F9DCDC', // Pink
            priceColor: '#D23F57', // Red
            img: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e4e006822af104db61_book-min.png'
        },
        {
            save: 67,
            bg: '#F2E4D9', // Sand
            priceColor: '#964B00', // Brown
            img: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e61a7c20076aec5fe7_shirt-min.png'
        },
        {
            save: 59,
            bg: '#D6F8E1', // Mint
            priceColor: '#007D43', // Green
            img: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e53f7127592743f6be_bug%20%26%20book-min.png'
        },
    ];

    return (
        <section className="section" style={{ backgroundColor: '#fff', padding: '80px 0' }}>
            <div className="container">
                <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '40px', color: '#231F1E' }}>
                    Get Up To 70% Off
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '24px'
                }}>
                    {promos.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor: item.bg,
                                borderRadius: '16px',
                                padding: '32px 32px 0 32px',
                                position: 'relative',
                                height: '380px',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
                                e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                            }}
                        >
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                <h3 style={{
                                    fontSize: '18px',
                                    fontWeight: '700',
                                    color: '#231F1E',
                                    marginBottom: '4px'
                                }}>
                                    Save
                                </h3>
                                <div style={{
                                    fontSize: '52px',
                                    fontWeight: '800',
                                    color: item.priceColor,
                                    lineHeight: 1,
                                    marginBottom: '16px'
                                }}>
                                    <span style={{ fontSize: '28px', verticalAlign: 'top', marginRight: '2px' }}>$</span>{item.save}
                                </div>
                                <p style={{
                                    color: '#231F1E',
                                    fontSize: '15px',
                                    fontWeight: '500',
                                    lineHeight: '1.5',
                                    maxWidth: '200px'
                                }}>
                                    Explore Our Furniture & Home Furnishing Range
                                </p>
                            </div>

                            <div style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                                marginTop: '20px',
                                width: '100%'
                            }}>
                                <img
                                    src={item.img}
                                    alt="Product"
                                    style={{
                                        width: '100%',
                                        height: '220px',
                                        objectFit: 'contain',
                                        objectPosition: 'bottom',
                                        transition: 'transform 0.5s ease'
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PromoGrid;
