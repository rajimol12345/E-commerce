import React, { useState, useEffect, useRef } from 'react';
import api from '../utils/api';
import ProductCard from './ProductCard';

const MostSellingProducts = () => {
    const [products, setProducts] = useState([]);
    const scrollContainerRef = useRef(null);
    const [scrollBarWidth, setScrollBarWidth] = useState(0); // Percentage
    const [scrollBarLeft, setScrollBarLeft] = useState(0); // Percentage

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await api.get('/products?limit=8');
                setProducts(data.products || data || []);
            } catch (error) {
                console.error('Error fetching most selling products:', error);
            }
        };
        fetch();
    }, []);

    // Update scroll bar dimensions on load / resize / data change
    useEffect(() => {
        const updateScrollBar = () => {
            if (scrollContainerRef.current) {
                const { clientWidth, scrollWidth } = scrollContainerRef.current;
                const ratio = clientWidth / scrollWidth;
                setScrollBarWidth(ratio * 100);
            }
        };

        updateScrollBar();
        window.addEventListener('resize', updateScrollBar);
        // Also update shortly after render to ensure content layout
        setTimeout(updateScrollBar, 500);

        return () => window.removeEventListener('resize', updateScrollBar);
    }, [products]);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            const maxScrollLeft = scrollWidth - clientWidth;

            if (maxScrollLeft > 0) {
                const scrollPercentage = scrollLeft / maxScrollLeft;
                // The available track for the scrollbar thumb to move is (100% - thumbWidth%)
                const availableTrack = 100 - scrollBarWidth;
                setScrollBarLeft(scrollPercentage * availableTrack);
            }
        }
    };

    return (
        <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
            <div className="container" style={{ maxWidth: '1280px' }}>
                <h2 style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    color: '#231F1E',
                    marginBottom: '40px'
                }}>
                    Most Selling Products
                </h2>

                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    style={{
                        display: 'grid',
                        gridAutoFlow: 'column',
                        gridAutoColumns: 'minmax(280px, 1fr)',
                        gap: '32px',
                        overflowX: 'auto',
                        paddingBottom: '24px',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                    className="hide-scrollbar"
                >
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

                {/* Progress Bar Track */}
                <div style={{
                    marginTop: '20px',
                    width: '100%',
                    height: '2px', // Thin line
                    backgroundColor: '#E6E8EC',
                    position: 'relative',
                    borderRadius: '2px',
                    overflow: 'hidden'
                }}>
                    {/* Progress Bar Thumb */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        height: '100%',
                        backgroundColor: '#231F1E', // Dark thumb
                        borderRadius: '2px',
                        width: `${Math.min(100, Math.max(10, scrollBarWidth))}%`,
                        left: `${scrollBarLeft}%`,
                        transition: 'left 0.1s ease-out'
                    }} />
                </div>
            </div>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default MostSellingProducts;
