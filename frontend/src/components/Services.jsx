import React from 'react';
import { motion } from 'framer-motion';
import serviceFaq from '../assets/service-faq.png';
import servicePayment from '../assets/service-payment.png';
import serviceDelivery from '../assets/service-delivery.png';

const Services = () => {
    const services = [
        {
            id: 1,
            title: 'Frequently Asked Questions',
            desc: 'Updates on safe Shopping in our Stores',
            img: serviceFaq,
            bgColor: '#F3D9DA' // Pink
        },
        {
            id: 2,
            title: 'Online Payment Process',
            desc: 'Updates on safe Shopping in our Stores',
            img: servicePayment,
            bgColor: '#A0D8B3' // Green
        },
        {
            id: 3,
            title: 'Home Delivery Options',
            desc: 'Updates on safe Shopping in our Stores',
            img: serviceDelivery,
            bgColor: '#FBE696' // Yellow
        }
    ];

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' }
        }
    };

    return (
        <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{
                        fontSize: '32px',
                        fontWeight: '800',
                        marginBottom: '40px',
                        color: '#231F1E'
                    }}
                >
                    Services To Help You Shop
                </motion.h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '32px'
                    }}
                >
                    {services.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.04 }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            style={{
                                backgroundColor: 'white', // Card bg set to white as per request? Reference looks like white top.
                                // Wait, the reference card seems to be ONE container with white TOP and colored BOTTOM.
                                // Actually, typically these are cards with white bg, and the image sits on a colored rect.
                                // Let's strictly follow the approved plan: "White background with rounded corners... Image Area: Bottom specific colored backgrounds"
                                borderRadius: '24px',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '420px', // Consistent height
                                cursor: 'pointer'
                            }}
                        >
                            {/* Top Text Content */}
                            <div style={{
                                padding: '40px 40px 20px 40px',
                                flex: '0 0 auto', // Don't grow, take needed space
                                backgroundColor: 'white'
                            }}>
                                <h3 style={{
                                    fontSize: '24px',
                                    fontWeight: '800',
                                    marginBottom: '12px',
                                    color: '#231F1E',
                                    lineHeight: '1.3'
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{
                                    fontSize: '16px',
                                    color: '#5F6C72',
                                    margin: 0,
                                    lineHeight: '1.5',
                                    fontWeight: '500'
                                }}>
                                    {item.desc}
                                </p>
                            </div>

                            {/* Bottom Image Area */}
                            <div style={{
                                flex: '1 1 auto', // Grow to fill rest
                                backgroundColor: item.bgColor,
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'center'
                            }}>
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                        display: 'block'
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
