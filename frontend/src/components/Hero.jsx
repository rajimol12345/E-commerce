import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section style={{
            position: 'relative',
            backgroundColor: '#B5D8E8', // Approximate light blue from screenshot
            backgroundImage: 'url("https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e8c4e58c0997219ec01eb6_background-bg-min.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '150px 0',
            overflow: 'hidden',
            minHeight: '700px'
        }}>

            {/* 1. Stage Layer (Absolute Background Layout) */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                zIndex: 1,
                pointerEvents: 'none' // Allow clicking through to background if needed
            }}>
                {/* Yellow Steps Background */}
                <div style={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'right', // Aligns image to right
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}>
                    <img
                        src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e9b930e006824963189865_bg-stage.png"
                        alt="Background Stage"
                        style={{
                            height: '90%', // Adjust based on visual
                            objectFit: 'contain',
                            marginRight: '-5%' // Slight offset if needed
                        }}
                    />
                </div>

                {/* Floating Images (Exact CSS Positions) */}

                {/* banner-product-image-one: other-min (Bags?) */}
                <img
                    src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e660afc23a10a53523_other-min.png"
                    style={{ position: 'absolute', top: '71px', right: '125px', zIndex: 2 }}
                    className="animate-float"
                    alt="Product 1"
                />

                {/* banner-product-image-two: tour-min (Suitcase?) */}
                <img
                    src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e75b939fd1159c029e_tour-min.png"
                    style={{ position: 'absolute', top: '156px', right: '433px', zIndex: 2 }}
                    className="animate-float-reverse delay-200"
                    alt="Product 2"
                />

                {/* banner-product-image-three: ele (Electronics?) */}
                <img
                    src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e9c0607f75e4aad54b94a0_ele.png"
                    style={{ position: 'absolute', top: '300px', right: '208px', zIndex: 2 }}
                    className="animate-float-slow delay-500"
                    alt="Product 3"
                />

                {/* banner-product-image-four: snaks-min (Snacks?) */}
                <img
                    src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e7037f3b07ebcf202d_snaks-min.png"
                    style={{ position: 'absolute', top: '350px', right: '550px', zIndex: 2 }}
                    className="animate-float-reverse delay-300"
                    alt="Product 4"
                />
            </div>

            {/* 2. Content Layer (Text) */}
            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ maxWidth: '500px' }} className="animate-slide-up">
                    <h1 style={{
                        fontSize: '64px',
                        fontWeight: '800',
                        color: 'var(--color-primary)',
                        lineHeight: '74px',
                        marginBottom: '30px'
                    }}>
                        Shopping And <br /> Department Store.
                    </h1>
                    <p style={{
                        fontSize: '20px',
                        marginBottom: '50px',
                        maxWidth: '480px',
                        lineHeight: '145%',
                        color: 'var(--color-text-muted)'
                    }}>
                        Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.
                    </p>
                    <Link to="/shop" className="btn btn-primary" style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        padding: '16px 36px',
                        borderRadius: '50px',
                        fontSize: '16px',
                        fontWeight: '600'
                    }}>
                        Learn More
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
