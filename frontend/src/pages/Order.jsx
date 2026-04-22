import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaTruck, FaCreditCard, FaPaypal, FaCheckCircle, FaClock } from 'react-icons/fa';
import api from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';

// Stripe Checkout Form Component
const StripeCheckoutForm = ({ orderId, amount, onPaid }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) return;

        try {
            const { data: { client_secret } } = await api.post('/payment/stripe/process', {
                amount: Math.round(amount * 100) // Stripe expects cents
            });

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                setError(result.error.message);
                setProcessing(false);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    const paymentResult = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                        update_time: new Date().toISOString(),
                        email_address: result.paymentIntent.receipt_email || 'stripe@example.com'
                    };
                    await api.put(`/orders/${orderId}/pay`, paymentResult);
                    toast.success('Payment Successful!');
                    navigate(`/order-success/${orderId}`);
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ padding: '20px', border: '1.5px solid #E6E8EC', borderRadius: '16px', marginBottom: '20px' }}>
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#23262F',
                            '::placeholder': { color: '#777E90' },
                        },
                    },
                }} />
            </div>
            {error && <div style={{ color: '#FF6B6B', fontSize: '14px', marginBottom: '16px' }}>{error}</div>}
            <button
                type="submit"
                disabled={!stripe || processing}
                className="btn btn-primary"
                style={{ width: '100%', borderRadius: '50px', padding: '16px' }}
            >
                {processing ? 'Processing...' : `Pay $${amount}`}
            </button>
        </form>
    );
};

const Order = () => {
    const { id: orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stripePromise, setStripePromise] = useState(null);
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const fetchOrder = async () => {
        try {
            const { data } = await api.get(`/orders/${orderId}`);
            setOrder(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching order:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();

        const setupStripe = async () => {
            try {
                const { data } = await api.get('/payment/stripe/config');
                setStripePromise(loadStripe(data.stripeApiKey));
            } catch (err) {
                console.error("Stripe config error", err);
            }
        };

        const setupPayPal = async () => {
            const { data: clientId } = await api.get('/config/paypal');
            paypalDispatch({
                type: 'resetOptions',
                value: {
                    'client-id': clientId,
                    currency: 'USD',
                },
            });
            paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
        };

        setupStripe();
        setupPayPal();
    }, [orderId, paypalDispatch]);

    const paypalPaymentHandler = async (details) => {
        try {
            const paymentResult = {
                id: details.id,
                status: details.status,
                update_time: details.update_time,
                email_address: details.payer.email_address,
            };
            await api.put(`/orders/${orderId}/pay`, paymentResult);
            toast.success('Payment Successful!');
            navigate(`/order-success/${orderId}`);
        } catch (error) {
            console.error('Error updating order to paid:', error);
            toast.error('Payment failed');
        }
    };

    if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading Order...</div>;
    if (!order) return <div style={{ padding: '100px', textAlign: 'center' }}>Order Not Found</div>;

    return (
        <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '60px 0' }}>
            <div className="container">
                <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>

                    {/* Left Column: Order Details */}
                    <div style={{ flex: '1.5', minWidth: '350px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                            <h1 style={{ fontSize: '32px', fontWeight: '800', margin: 0 }}>Order Detail</h1>
                            <span style={{
                                padding: '6px 16px', backgroundColor: '#F4F5F6', borderRadius: '50px',
                                fontSize: '14px', fontWeight: '600', color: '#777E90'
                            }}>
                                ID: {order._id.substring(0, 8)}...
                            </span>
                        </div>

                        {/* Order Status Cards */}
                        <div className="flex-mobile-col" style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
                            <div style={{ flex: 1, backgroundColor: 'white', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                    <div style={{ backgroundColor: '#EEF2FF', padding: '10px', borderRadius: '12px' }}><FaTruck color="#4F46E5" /></div>
                                    <h3 style={{ fontSize: '16px', margin: 0 }}>Shipping</h3>
                                </div>
                                <p style={{ fontSize: '14px', color: '#777E90', marginBottom: '12px' }}>
                                    {order.shippingAddress.address}, {order.shippingAddress.city}<br />
                                    {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? (
                                    <div style={{ color: '#059669', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <FaCheckCircle /> Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
                                    </div>
                                ) : (
                                    <div style={{ color: '#F59E0B', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <FaClock /> Not Delivered
                                    </div>
                                )}
                            </div>

                            <div style={{ flex: 1, backgroundColor: 'white', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                    <div style={{ backgroundColor: '#F0FDF4', padding: '10px', borderRadius: '12px' }}><FaCreditCard color="#059669" /></div>
                                    <h3 style={{ fontSize: '16px', margin: 0 }}>Payment</h3>
                                </div>
                                <p style={{ fontSize: '14px', color: '#777E90', marginBottom: '12px' }}>
                                    Method: {order.paymentMethod}
                                </p>
                                {order.isPaid ? (
                                    <div style={{ color: '#059669', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <FaCheckCircle /> Paid on {new Date(order.paidAt).toLocaleDateString()}
                                    </div>
                                ) : (
                                    <div style={{ color: '#FF6B6B', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <FaClock /> Not Paid
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Order Items */}
                        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                            <h3 style={{ marginBottom: '24px' }}>Order Items</h3>
                            <div style={{ display: 'grid', gap: '20px' }}>
                                {order.orderItems.map((item, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingBottom: '20px', borderBottom: index < order.orderItems.length - 1 ? '1px solid #F4F5F6' : 'none' }}>
                                        <img
                                            src={item.image?.startsWith('http') ? item.image : `https://e-commerce-jh2x.onrender.com${item.image}`}
                                            alt={item.name}
                                            style={{ width: '80px', height: '80px', objectFit: 'contain', backgroundColor: '#F4F5F6', borderRadius: '16px' }}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ fontSize: '16px', margin: '0 0 4px 0' }}>{item.name}</h4>
                                            <p style={{ fontSize: '14px', color: '#777E90', margin: 0 }}>Qty: {item.qty}</p>
                                        </div>
                                        <div style={{ fontWeight: '700' }}>${item.price.toFixed(2)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Summary & Payment */}
                    <div style={{ flex: '0.8', minWidth: '300px' }}>
                        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '32px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', position: 'sticky', top: '20px' }}>
                            <h3 style={{ marginBottom: '24px' }}>Summary</h3>
                            <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#777E90' }}>
                                    <span>Items Price</span>
                                    <span>${order.itemsPrice.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#777E90' }}>
                                    <span>Shipping</span>
                                    <span>${order.shippingPrice.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#777E90' }}>
                                    <span>Tax</span>
                                    <span>${order.taxPrice.toFixed(2)}</span>
                                </div>
                                <div style={{
                                    display: 'flex', justifyContent: 'space-between', padding: '20px 0',
                                    borderTop: '1px solid #F4F5F6', fontWeight: '800', fontSize: '20px'
                                }}>
                                    <span>Total</span>
                                    <span style={{ color: '#003D29' }}>${order.totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Payment Actions */}
                            {!order.isPaid && (
                                <div style={{ borderTop: '1px solid #F4F5F6', paddingTop: '24px' }}>
                                    <h4 style={{ marginBottom: '20px', fontSize: '18px' }}>Complete Payment</h4>

                                    {order.paymentMethod === 'PayPal' && (
                                        <AnimatePresence>
                                            {isPending ? <div style={{ textAlign: 'center' }}>Loading PayPal...</div> : (
                                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                    <PayPalButtons
                                                        createOrder={(data, actions) => {
                                                            return actions.order.create({
                                                                purchase_units: [{ amount: { value: order.totalPrice.toString() } }]
                                                            });
                                                        }}
                                                        onApprove={(data, actions) => {
                                                            return actions.order.capture().then(paypalPaymentHandler);
                                                        }}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}

                                    {order.paymentMethod === 'Stripe' && stripePromise && (
                                        <Elements stripe={stripePromise}>
                                            <StripeCheckoutForm
                                                orderId={orderId}
                                                amount={order.totalPrice}
                                                onPaid={fetchOrder}
                                            />
                                        </Elements>
                                    )}

                                    {order.paymentMethod === 'Cash on Delivery' && (
                                        <div style={{
                                            padding: '20px', backgroundColor: '#F0FDF4', borderRadius: '16px',
                                            color: '#059669', fontSize: '14px', display: 'flex', gap: '12px'
                                        }}>
                                            <FaClock style={{ marginTop: '2px' }} />
                                            <span>The amount will be collected in cash upon delivery of your items.</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {order.isPaid && (
                                <div style={{
                                    padding: '24px', backgroundColor: '#F0FDF4', borderRadius: '16px',
                                    textAlign: 'center', color: '#059669', fontWeight: '700'
                                }}>
                                    🎉 Order Fully Paid
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Order;
