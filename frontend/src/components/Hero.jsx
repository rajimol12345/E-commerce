import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">

            {/* 1. Stage Layer (Absolute Background Layout) */}
            <div className="hero-images-container">
                <div className="hero-stage">
                    <img
                        src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e9b930e006824963189865_bg-stage.png"
                        alt="Background Stage"
                        className="stage-img"
                    />
                </div>

                {/* Floating Images */}
                <img
                    src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e660afc23a10a53523_other-min.png"
                    style={{ position: 'absolute', top: '71px', right: '125px', zIndex: 2 }}
                    className="animate-float"
                    alt="Product 1"
                />

                <img
                    src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e75b939fd1159c029e_tour-min.png"
                    style={{ position: 'absolute', top: '156px', right: '433px', zIndex: 2 }}
                    className="animate-float-reverse delay-200"
                    alt="Product 2"
                />

                <img
                    src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e9c0607f75e4aad54b94a0_ele.png"
                    style={{ position: 'absolute', top: '300px', right: '208px', zIndex: 2 }}
                    className="animate-float-slow delay-500"
                    alt="Product 3"
                />

                <img
                    src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e7037f3b07ebcf202d_snaks-min.png"
                    style={{ position: 'absolute', top: '350px', right: '550px', zIndex: 2 }}
                    className="animate-float-reverse delay-300"
                    alt="Product 4"
                />
            </div>

            {/* 2. Content Layer (Text) */}
            <div className="container hero-content">
                <div className="hero-text animate-slide-up">
                    <h1 className="hero-title">
                        Shopping And <br /> Department Store.
                    </h1>
                    <p className="hero-description">
                        Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.
                    </p>
                    <Link to="/shop" className="btn btn-primary">
                        Learn More
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
