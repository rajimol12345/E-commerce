import React from 'react';

const DiscountBanner = () => {
    return (
        <section className="section">
            <div className="container">
                <div className="discount-banner-wrapper">
                    {/* Text Content */}
                    <div className="discount-banner-content">
                        <h2 className="discount-banner-title">
                            Get 5% Cash Back
                        </h2>
                        <p className="discount-banner-text">
                            on Shopcart.com
                        </p>
                        <button className="discount-banner-btn">
                            Learn More
                        </button>
                    </div>

                    {/* Stacked Cards Images */}
                    <div className="discount-banner-images">
                        <img
                            src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e4c21faa5e03c209c5_Furniture%20Village-min.png"
                            alt="Card 1"
                            className="discount-card card-1"
                        />
                        <img
                            src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e4c21faa5e03c209c5_Furniture%20Village-min.png"
                            alt="Card 2"
                            className="discount-card card-2"
                        />
                    </div>
                </div>
            </div>
            <style>{`
                .discount-banner-wrapper {
                    background-color: #FFE6CC;
                    border-radius: 24px;
                    min-height: 300px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 40px 80px;
                    overflow: hidden;
                    position: relative;
                }
                .discount-banner-content {
                    z-index: 2;
                    max-width: 500px;
                }
                .discount-banner-title {
                    font-size: 3rem;
                    font-weight: 800;
                    color: #231F1E;
                    margin-bottom: 12px;
                    line-height: 1.2;
                }
                .discount-banner-text {
                    font-size: 1.125rem;
                    font-weight: 500;
                    color: #231F1E;
                    margin-bottom: 32px;
                    opacity: 0.9;
                }
                .discount-banner-btn {
                    background-color: #003D29;
                    color: white;
                    padding: 14px 32px;
                    border-radius: 50px;
                    font-size: 16px;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .discount-banner-images {
                    position: relative;
                    width: 380px;
                    height: 300px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .discount-card {
                    position: absolute;
                    width: 220px;
                    filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));
                    border-radius: 12px;
                }
                .card-1 { z-index: 3; transform: rotate(-5deg); }
                .card-2 { z-index: 2; transform: rotate(10deg) translate(30px, 20px); }

                @media (max-width: 1024px) {
                    .discount-banner-wrapper { padding: 40px; }
                    .discount-banner-title { font-size: 2.5rem; }
                }

                @media (max-width: 768px) {
                    .discount-banner-wrapper {
                        flex-direction: column;
                        text-align: center;
                        padding: 60px 20px;
                    }
                    .discount-banner-images {
                        margin-top: 40px;
                        width: 100%;
                        height: 250px;
                    }
                    .discount-card {
                        width: 180px;
                    }
                }
            `}</style>
        </section>
    );
};

export default DiscountBanner;
