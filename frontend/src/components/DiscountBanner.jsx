import React from 'react';

const DiscountBanner = () => {
    return (
        <section className="section">
            <div className="container">
                <div style={{
                    backgroundColor: '#FFE6CC',
                    borderRadius: '24px',
                    minHeight: '300px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 80px',
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    {/* Text Content */}
                    <div style={{ zIndex: 2, maxWidth: '500px' }}>
                        <h2 style={{
                            fontSize: '3rem',
                            fontWeight: '800',
                            color: '#231F1E',
                            marginBottom: '12px',
                            lineHeight: '1.2'
                        }}>
                            Get 5% Cash Back
                        </h2>
                        <p style={{
                            fontSize: '1.125rem',
                            fontWeight: '500',
                            color: '#231F1E',
                            marginBottom: '32px',
                            opacity: 0.9
                        }}>
                            on Shopcart.com
                        </p>
                        <button style={{
                            backgroundColor: '#003D29',
                            color: 'white',
                            padding: '14px 32px',
                            borderRadius: '50px',
                            fontSize: '16px',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 10px 20px rgba(0,61,41,0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            Learn More
                        </button>
                    </div>

                    {/* Stacked Cards Images */}
                    <div style={{
                        position: 'relative',
                        width: '380px',
                        height: '350px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '20px'
                    }}>
                        {/* 3. Yellow Card (Bottom/Back) */}
                        <img
                            src="/card_yellow.png"
                            alt="Yellow Card"
                            style={{
                                position: 'absolute',
                                width: '280px',
                                zIndex: 1,
                                transform: 'rotate(12deg) translate(40px, 40px)',
                                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
                            }}
                        />

                        {/* 2. Red Card (Middle) */}
                        <img
                            src="/card_red.png"
                            alt="Red Card"
                            style={{
                                position: 'absolute',
                                width: '280px',
                                zIndex: 2,
                                transform: 'rotate(6deg) translate(20px, 20px)',
                                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
                            }}
                        />

                        {/* 1. Green Card (Top/Front) */}
                        <img
                            src="/card_green.png"
                            alt="Green Card"
                            style={{
                                position: 'absolute',
                                width: '280px',
                                zIndex: 3,
                                transform: 'rotate(0deg)',
                                filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.15))'
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DiscountBanner;
