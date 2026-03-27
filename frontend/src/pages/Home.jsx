import React, { useEffect, useState, useRef } from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import Brands from '../components/Brands';
import PromoGrid from '../components/PromoGrid';
import Banner from '../components/Banner';
import DiscountBanner from '../components/DiscountBanner';
import Services from '../components/Services';
import ProductCard from '../components/ProductCard';
import BestDeals from '../components/BestDeals';
import WeeklyPopular from '../components/WeeklyPopular';
import TabbedProducts from '../components/TabbedProducts';

import BestSellingStore from '../components/BestSellingStore';
import MostSellingProducts from '../components/MostSellingProducts';
import TrendingProductsForYou from '../components/TrendingProductsForYou';
import api from '../utils/api';

const ScrollSection = ({ children }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <div ref={sectionRef} className="reveal">
            {children}
        </div>
    );
};

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                setProducts(data.products || data || []);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };
        fetchProducts();
    }, []);

    // Filter dynamic data for sections to maintain high-fidelity feel
    const referenceDeals = products.filter(p => ['Tech', 'Laptop', 'Travel'].includes(p.category?.name || p.category)).slice(0, 4);
    const popularItems = products.filter(p => ['Headphone', 'Accessories'].includes(p.category?.name || p.category)).slice(0, 4);

    return (
        <div style={{ backgroundColor: 'white' }}>
            {/* 2. Hero */}
            <Hero />

            {/* 3. Categories */}
            <ScrollSection>
                <Categories />
            </ScrollSection>

            {/* 4. Today's Best Deals (Horizontal Scroll) */}
            <ScrollSection>
                <BestDeals />
            </ScrollSection>

            {/* 5. Brand Selection */}
            <ScrollSection>
                <Brands />
            </ScrollSection>

            {/* 6. Promo Grid (70% OFF) */}
            <ScrollSection>
                <PromoGrid />
            </ScrollSection>

            {/* 7. Weekly Popular (Horizontal Scroll) */}
            <ScrollSection>
                <WeeklyPopular />
            </ScrollSection>

            {/* 8. Cashback Banner (Large) */}
            <ScrollSection>
                <Banner />
            </ScrollSection>

            {/* 9. Most Selling Products (New Section) */}
            <ScrollSection>
                <MostSellingProducts />
            </ScrollSection>

            {/* 10. Tabbed Products (Category Filter) */}
            <ScrollSection>
                <TabbedProducts />
            </ScrollSection>

            {/* 10. Discount Banner (Small) */}
            <ScrollSection>
                <DiscountBanner />
            </ScrollSection>





            {/* 12. Best Selling Store */}
            <ScrollSection>
                <BestSellingStore />
            </ScrollSection>

            {/* 13. Trending Products For You (New) */}
            <ScrollSection>
                <TrendingProductsForYou />
            </ScrollSection>

            {/* 14. Services */}
            <ScrollSection>
                <Services />
            </ScrollSection>

        </div>
    );
};

export default Home;
