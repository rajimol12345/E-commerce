import React from 'react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'white', padding: '80px 0 40px', marginTop: 'auto', borderTop: '1px solid #E5E5E5' }}>
            <div className="container">
                <div className="grid-5" style={{
                    marginBottom: '60px'
                }}>
                    {/* Column 1: Brand & Payments */}
                    <div className="footer-col-brand" style={{ paddingRight: '20px' }}>
                        <a href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '24px' }}>
                            <img src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e86ab4c21faa7bc0bd90dd_Logo.svg" alt="Shopcart" style={{ height: '35px' }} />
                        </a>
                        <p style={{
                            color: 'var(--color-dark)',
                            opacity: 0.8,
                            marginBottom: '40px',
                            lineHeight: '1.6',
                            fontSize: '15px',
                            fontWeight: '500'
                        }}>
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
                        </p>

                        <h5 style={{
                            fontSize: '18px',
                            fontWeight: '700',
                            color: 'var(--color-dark)',
                            marginBottom: '30px'
                        }}>
                            Accepted Payments
                        </h5>
                        <div className="payment-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', maxWidth: '320px' }}>
                            {[
                                // Row 1
                                'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb1ce8816711ebecac46d8_stripe.png',
                                'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb1ce82d440b7ab84a993f_visa.png',
                                'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb1ce8f032504012a5896b_Mastercard.png',
                                'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e48b497e6ce846b7ff_Amazon.png',
                                // Row 2
                                'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb1f054e419e42aca4a9a2_Klarna.png',
                                'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb1ce7c4510cf9a55828a0_PayPal.png',
                                'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e4707380264b25e680_ApplePay.png',
                                'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb1f55dc68c5ee83d0cbf8_GooglePay.png'
                            ].map((src, i) => (
                                <div key={i} style={{
                                    padding: '10px 8px',
                                    border: '1px solid #F0F0F0',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'white',
                                    height: '45px'
                                }}>
                                    <img src={src} alt="Payment" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Department */}
                    <div>
                        <h4 style={{ marginBottom: '30px', fontSize: '18px', fontWeight: '700', color: 'var(--color-dark)' }}>Department</h4>
                        <ul className="footer-links">
                            {['Fashion', 'Education Product', 'Frozen Food', 'Beverages', 'Organic Grocery', 'Office Supplies', 'Beauty Products', 'Books', 'Electronics & Gadget', 'Travel Accessories', 'Fitness', 'Sneakers', 'Toys', 'Furniture'].map(item => (
                                <li key={item}><a href="#">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: About Us */}
                    <div>
                        <h4 style={{ marginBottom: '30px', fontSize: '18px', fontWeight: '700', color: 'var(--color-dark)' }}>About Us</h4>
                        <ul className="footer-links">
                            {['About Shopcart', 'Careers', 'News & Blog', 'Help', 'Press Center', 'Shop By Location', 'Shopcart Brands', 'Affiliate & Partners', 'Ideas & Guides'].map(item => (
                                <li key={item}><a href="#">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Services */}
                    <div>
                        <h4 style={{ marginBottom: '30px', fontSize: '18px', fontWeight: '700', color: 'var(--color-dark)' }}>Services</h4>
                        <ul className="footer-links">
                            {['Gift Card', 'Mobile App', 'Shipping & Delivery', 'Order Pickup', 'Account Signup'].map(item => (
                                <li key={item}><a href="#">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 5: Help */}
                    <div>
                        <h4 style={{ marginBottom: '30px', fontSize: '18px', fontWeight: '700', color: 'var(--color-dark)' }}>Help</h4>
                        <ul className="footer-links">
                            {['Shopcart Help', 'Returns', 'Track Orders', 'Contact Us', 'Feedback', 'Security & Fraud'].map(item => (
                                <li key={item}><a href="#">{item}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <div className="footer-bottom-links">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb0ed6e927bdf5bc4309e0_briefcase.svg" alt="" style={{ width: '22px' }} />
                            <span>Become Seller</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb0ed6c4510c256356f4cd_gift.svg" alt="" style={{ width: '22px' }} />
                            <span>Gift Cards</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63eb0ed6ae57fd74e0402aa4_help-circle.svg" alt="" style={{ width: '22px' }} />
                            <span>Help Center</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '40px' }}>
                        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
                        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy & Policy</a>
                    </div>

                    <div className="footer-copyright">
                        All Right reserved by Musemind <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>ui/ux design</span> agency | 2022
                    </div>
                </div>
            </div>

            <style>{`
                .footer-links { list-style: none; padding: 0; margin: 0; }
                .footer-links li { margin-bottom: 20px; }
                .footer-links a { 
                    color: var(--color-dark);
                    opacity: 0.8;
                    text-decoration: none; 
                    font-size: 1rem;
                    transition: all 0.2s ease;
                    display: inline-block;
                    font-weight: 500;
                }
                .footer-links a:hover { 
                    color: var(--color-primary); 
                    opacity: 1;
                    transform: translateX(3px);
                }
                .footer-bottom {
                    border-top: 1px solid #E5E5E5;
                    padding-top: 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 20px;
                    fontSize: 15px;
                    color: var(--color-dark);
                    font-weight: 600;
                }
                .footer-bottom-links {
                    display: flex;
                    gap: 30px;
                    align-items: center;
                }
                @media (max-width: 1024px) {
                    .footer-col-brand {
                        grid-column: span 3;
                        padding-right: 0;
                        margin-bottom: 20px;
                    }
                }
                @media (max-width: 768px) {
                    .footer-col-brand {
                        grid-column: span 2;
                    }
                    .footer-bottom {
                        flex-direction: column;
                        text-align: center;
                    }
                    .footer-bottom-links {
                        flex-direction: column;
                        gap: 15px;
                    }
                }
                @media (max-width: 480px) {
                    .footer-col-brand {
                        grid-column: span 1;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
