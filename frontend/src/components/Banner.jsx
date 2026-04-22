import React from 'react';

const Banner = () => {
    return (
        <section className="section" style={{ padding: '80px 0' }}>
            <div className="container">
                <div className="banner-wrapper">
                    <div className="banner-content-box">
                        <h2 className="banner-title">
                            Get 5% Cash Back On $200
                        </h2>
                        <p className="banner-text">
                            Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.
                        </p>
                        <button className="banner-btn">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
            <style>{`
                .banner-wrapper {
                    position: relative;
                    border-radius: 24px;
                    overflow: hidden;
                    height: 500px;
                    backgroundImage: url("https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=2070&auto=format&fit=crop");
                    background-image: url("https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=2070&auto=format&fit=crop");
                    background-size: cover;
                    background-position: center;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                }
                .banner-content-box {
                    backgroundColor: #003D29;
                    background-color: #003D29;
                    padding: 60px;
                    width: 45%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    position: relative;
                }
                .banner-title {
                    color: white;
                    font-size: 3.5rem;
                    font-weight: 800;
                    margin-bottom: 24px;
                    line-height: 1.2;
                }
                .banner-text {
                    color: #e5e7eb;
                    font-size: 1.125rem;
                    margin-bottom: 40px;
                    line-height: 1.6;
                    max-width: 90%;
                }
                .banner-btn {
                    backgroundColor: transparent;
                    background-color: transparent;
                    color: white;
                    border: 1px solid white;
                    padding: 12px 32px;
                    border-radius: 50px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    width: fit-content;
                }
                .banner-btn:hover {
                    background-color: white;
                    color: #003D29;
                }
                @media (max-width: 1024px) {
                    .banner-content-box {
                        width: 60%;
                        padding: 40px;
                    }
                    .banner-title {
                        font-size: 2.5rem;
                    }
                }
                @media (max-width: 768px) {
                    .banner-wrapper {
                        height: auto;
                        flex-direction: column;
                    }
                    .banner-content-box {
                        width: 100%;
                        padding: 40px 20px;
                        text-align: center;
                        align-items: center;
                    }
                    .banner-title {
                        font-size: 2rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default Banner;
