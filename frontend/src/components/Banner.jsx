import React from 'react';

const Banner = () => {
    return (
        <section style={{ padding: '80px 0' }}>
            <div className="container">
                <div style={{
                    position: 'relative',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    height: '500px',
                    backgroundImage: 'url("https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=2070&auto=format&fit=crop")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end', /* Align content to the right */
                    padding: '0' /* Remove default padding to control box placement */
                }}>

                    {/* Dark Green Overlay Box - Positioned on right */}
                    <div style={{
                        backgroundColor: '#003D29',
                        padding: '60px',
                        width: '45%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', /* Straight edge */
                        position: 'relative',
                        right: 0
                    }}>
                        <h2 style={{
                            color: 'white',
                            fontSize: '3.5rem',
                            fontWeight: '800',
                            marginBottom: '24px',
                            lineHeight: '1.2'
                        }}>
                            Get 5% Cash Back On $200
                        </h2>
                        <p style={{
                            color: '#e5e7eb',
                            fontSize: '1.125rem',
                            marginBottom: '40px',
                            lineHeight: '1.6',
                            maxWidth: '90%'
                        }}>
                            Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.
                        </p>
                        <button style={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            border: '1px solid white',
                            padding: '12px 32px',
                            borderRadius: '50px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            width: 'fit-content'
                        }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = 'white';
                                e.target.style.color = '#003D29';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = 'white';
                            }}
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
