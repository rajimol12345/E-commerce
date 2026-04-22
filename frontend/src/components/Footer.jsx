import React from 'react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'white', padding: '80px 0 40px', marginTop: 'auto', borderTop: '1px solid #E5E7EB' }}>
            <div className="container">
                <div className="footer-grid-layout" style={{
                    marginBottom: '60px',
                    display: 'grid',
                    gap: '40px'
                }}>
                    {/* Column 1: Brand & Payments */}
                    <div className="footer-col-brand">
                        <a href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '24px' }}>
                            <img src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e86ab4c21faa7bc0bd90dd_Logo.svg" alt="Shopcart" style={{ height: '35px' }} />
                        </a>
                        <p style={{
                            color: '#4B5563',
                            marginBottom: '40px',
                            lineHeight: '1.6',
                            fontSize: '15px',
                            fontWeight: '500',
                            maxWidth: '320px'
                        }}>
                            Experience the best shopping with our curated selection of products. Quality and trust at your doorstep.
                        </p>

                        <h5 style={{
                            fontSize: '18px',
                            fontWeight: '700',
                            color: '#111827',
                            marginBottom: '24px'
                        }}>
                            Accepted Payments
                        </h5>
                        <div className="payment-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', maxWidth: '320px' }}>
                            {[
                                'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb1ce8816711ebecac46d8_stripe.png',
                                'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb1ce82d440b7ab84a993f_visa.png',
                                'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb1ce8f032504012a5896b_Mastercard.png',
                                'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e48b497e6ce846b7ff_Amazon.png',
                                'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb1f054e419e42aca4a9a2_Klarna.png',
                                'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb1ce7c4510cf9a55828a0_PayPal.png',
                                'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e4707380264b25e680_ApplePay.png',
                                'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb1f55dc68c5ee83d0cbf8_GooglePay.png'
                            ].map((src, i) => (
                                <div key={i} style={{
                                    padding: '8px',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'white',
                                    height: '42px'
                                }}>
                                    <img src={src} alt="Payment" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="footer-links-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '40px', flex: 1 }}>
                        <div>
                            <h4 className="footer-heading">Department</h4>
                            <ul className="footer-links">
                                {['Fashion', 'Education', 'Frozen Food', 'Beverages', 'Organic Grocery', 'Office Supplies'].map(item => (
                                    <li key={item}><a href="#">{item}</a></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="footer-heading">About Us</h4>
                            <ul className="footer-links">
                                {['About Shopcart', 'Careers', 'News & Blog', 'Help', 'Press Center'].map(item => (
                                    <li key={item}><a href="#">{item}</a></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="footer-heading">Services</h4>
                            <ul className="footer-links">
                                {['Gift Card', 'Mobile App', 'Shipping', 'Order Pickup', 'Account Signup'].map(item => (
                                    <li key={item}><a href="#">{item}</a></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="footer-heading">Help</h4>
                            <ul className="footer-links">
                                {['Returns', 'Track Orders', 'Contact Us', 'Feedback', 'Security'].map(item => (
                                    <li key={item}><a href="#">{item}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <div className="footer-bottom-left">
                        <div className="bottom-link-item">
                            <img src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb0ed6e927bdf5bc4309e0_briefcase.svg" alt="" />
                            <span>Become Seller</span>
                        </div>
                        <div className="bottom-link-item">
                            <img src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb0ed6c4510c256356f4cd_gift.svg" alt="" />
                            <span>Gift Cards</span>
                        </div>
                        <div className="bottom-link-item">
                            <img src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb0ed6ae57fd74e0402aa4_help-circle.svg" alt="" />
                            <span>Help Center</span>
                        </div>
                    </div>

                    <div className="footer-legal-links">
                        <a href="#">Terms of Service</a>
                        <a href="#">Privacy Policy</a>
                    </div>

                    <div className="footer-copyright">
                        © 2026 Musemind | All Rights Reserved
                    </div>
                </div>
            </div>

            <style>{`
                .footer-grid-layout {
                    grid-template-columns: 1.2fr 3fr;
                }
                .footer-heading {
                    margin-bottom: 24px;
                    font-size: 18px;
                    fontWeight: 700;
                    color: #111827;
                }
                .footer-links { 
                    list-style: none; 
                    padding: 0; 
                    margin: 0; 
                }
                .footer-links li { 
                    margin-bottom: 12px; 
                }
                .footer-links a { 
                    color: #4B5563;
                    text-decoration: none; 
                    font-size: 15px;
                    transition: all 0.2s ease;
                    display: inline-block;
                    font-weight: 500;
                }
                .footer-links a:hover { 
                    color: #003D29; 
                    transform: translateX(4px);
                }
                .footer-bottom {
                    border-top: 1px solid #E5E7EB;
                    padding-top: 32px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 24px;
                    font-size: 14px;
                    color: #374151;
                    font-weight: 600;
                }
                .footer-bottom-left {
                    display: flex;
                    gap: 24px;
                    align-items: center;
                    flex-wrap: wrap;
                }
                .bottom-link-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .bottom-link-item img {
                    width: 20px;
                }
                .footer-legal-links {
                    display: flex;
                    gap: 24px;
                }
                .footer-legal-links a {
                    color: inherit;
                    text-decoration: none;
                }
                .footer-legal-links a:hover {
                    color: #003D29;
                }

                @media (max-width: 1024px) {
                    .footer-grid-layout {
                        grid-template-columns: 1fr;
                    }
                    .footer-col-brand {
                        max-width: 100%;
                        border-bottom: 1px solid #E5E7EB;
                        padding-bottom: 40px;
                    }
                }

                @media (max-width: 768px) {
                    .footer-bottom {
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                    }
                    .footer-bottom-left {
                        justify-content: center;
                    }
                    .footer-legal-links {
                        justify-content: center;
                    }
                }

                @media (max-width: 480px) {
                    .footer-links-container {
                        grid-template-columns: 1fr 1fr !important;
                        gap: 32px 20px !important;
                    }
                    .footer-bottom-left {
                        flex-direction: column;
                        gap: 16px;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
