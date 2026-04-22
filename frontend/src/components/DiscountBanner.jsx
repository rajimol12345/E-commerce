import React from 'react';
import servicePayment from '../assets/service-payment.png';

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

                    {/* Single Credit Card Image */}
                    <div className="discount-banner-images">
                        <img
                            src={servicePayment}
                            alt="Credit Card"
                            className="discount-card-img"
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
                    width: 450px;
                    height: 300px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                }
                .discount-card-img {
                    width: 100%;
                    height: auto;
                    max-height: 350px;
                    object-fit: contain;
                    filter: drop-shadow(0 15px 30px rgba(0,0,0,0.1));
                    transition: transform 0.3s ease;
                }
                .discount-card-img:hover {
                    transform: scale(1.05);
                }

                @media (max-width: 1024px) {
                    .discount-banner-wrapper { padding: 40px; }
                    .discount-banner-title { font-size: 2.5rem; }
                    .discount-banner-images { width: 350px; }
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
                        height: auto;
                        justify-content: center;
                    }
                    .discount-card-img {
                        max-width: 300px;
                    }
                }
            `}</style>
        </section>
    );
};

export default DiscountBanner;

        </section>
    );
};

export default DiscountBanner;
