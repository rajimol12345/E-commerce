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
                        src="https://e-commerce-jh2x.onrender.com/images/bg-stage.png"
                        alt="Background Stage"
                        className="stage-img"
                    />
                </div>

                {/* Floating Images */}
                <img
                    src="https://e-commerce-jh2x.onrender.com/images/AppleAirpod.png"
                    style={{ position: 'absolute', top: '71px', right: '125px', zIndex: 2, width: '150px' }}
                    className="animate-float"
                    alt="Product 1"
                />

                <img
                    src="https://e-commerce-jh2x.onrender.com/images/BeatsSolo3.png"
                    style={{ position: 'absolute', top: '156px', right: '433px', zIndex: 2, width: '120px' }}
                    className="animate-float-reverse delay-200"
                    alt="Product 2"
                />

                <img
                    src="https://e-commerce-jh2x.onrender.com/images/BoseBt.png"
                    style={{ position: 'absolute', top: '300px', right: '208px', zIndex: 2, width: '130px' }}
                    className="animate-float-slow delay-500"
                    alt="Product 3"
                />

                <img
                    src="https://e-commerce-jh2x.onrender.com/images/WirelessEarbuds.png"
                    style={{ position: 'absolute', top: '350px', right: '550px', zIndex: 2, width: '110px' }}
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
