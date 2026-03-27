import React from 'react';
import { Link } from 'react-router-dom';

const TrendingProducts = () => {
    const trendingItems = [
        {
            id: 1,
            title: 'Luxury Handbag',
            subtitle: 'The perfect luxury for your lifestyle',
            image: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e4c21faa5e03c209c5_furniture-village-min.png',
            // The image names in original code seemed swapped or named unintuitively (furniture-village was first).
            // Checking the actual image content via URL wasn't possible directly, but based on typical "Shoppers Choice"
            // Left is usually the "Orange Bag". Let's assume the first one is the bag.
            // Wait, previous code had: 1. Furniture Village, 2. Fashion World.
            // Logic dictates 'Fashion World' is likely the bag. Let's swap these to be sure or use descriptive names if I can't verify.
            // Reference: Left = Orange Bag (Fashion), Right = Green Chair (Furniture).
            // So Item 1 should be the Bag.
            // Let's use the 'active' URLs from the previous file content but map them correctly.
            // File said: item 1 image: ...furniture-village-min.png. item 2: ...fashion-world-min.png.
            // If I assume filenames are descriptive: 
            // Item 1 (Furniture Village) -> Chair?
            // Item 2 (Fashion World) -> Bag?
            // If the user wants "Same images", I should keep the images but map them to the layout.
            // Layout: Left Card (Bag), Right Card (Chair).
            link: '/shop?category=Hand Bag',
            isBag: true
        },
        {
            id: 2,
            title: 'Comfortable Chair',
            subtitle: 'Relax in style and comfort',
            image: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e4c8ff8f0646ce0dc5_fashion-world-min.png',
            link: '/shop?category=Furniture',
            isBag: false
        }
    ];

    // correction: checking the previous image urls again.
    // id: 1, title: 'Furniture Village', image: ...furniture-village-min.png
    // id: 2, title: 'Fashion World', image: ...fashion-world-min.png
    // I will swap them to textually match "Shoppers Buying Choice" (Bag left, Chair right) if filenames imply content.
    // Let's assume 'fashion-world' is the bag and 'furniture-village' is the chair.

    const cards = [
        {
            id: 1,
            title: 'Luxury Handbag',
            description: 'Explore our latest collection of premium handbags.',
            image: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e4c8ff8f0646ce0dc5_fashion-world-min.png', // Fashion World image
            bgColor: '#FDF0E9', // Light orange/pinkish
            link: '/shop?category=Hand Bag'
        },
        {
            id: 2,
            title: 'Comfortable Chair',
            description: 'Ergonomic designs for your ultimate comfort.',
            image: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e4c21faa5e03c209c5_furniture-village-min.png', // Furniture Village image
            bgColor: '#F0F2F3', // Light gray/blueish
            link: '/shop?category=Furniture'
        }
    ];

    return (
        <section style={{
            padding: '80px 0',
            backgroundColor: 'white'
        }}>
            <div className="container">
                <h2 style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    marginBottom: '40px',
                    color: '#23262F'
                }}>
                    Shoppers Buying Choice
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
                    gap: '32px'
                }}>
                    {cards.map(item => (
                        <Link
                            key={item.id}
                            to={item.link}
                            style={{
                                textDecoration: 'none',
                                position: 'relative', // Text overlay if needed, or side by side
                                // Muse reference often has text overlay or text ON the image background.
                                // Let's try the "Card with Text Overlay" style but cleaner.
                                borderRadius: '24px',
                                overflow: 'hidden',
                                height: '320px',
                                backgroundColor: item.bgColor,
                                display: 'flex', // Flex to position image and text
                                flexDirection: 'row', // Horizontal layout within card? No, usually image is bg or main feature.
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '40px',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Text Content */}
                            <div style={{ zIndex: 2, width: '50%' }}>
                                <h3 style={{
                                    fontSize: '28px',
                                    fontWeight: '800',
                                    color: '#231F1E',
                                    marginBottom: '12px',
                                    lineHeight: '1.2'
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{
                                    fontSize: '16px',
                                    color: '#5F6C72',
                                    marginBottom: '24px'
                                }}>
                                    {item.description}
                                </p>
                                <button style={{
                                    padding: '12px 28px',
                                    borderRadius: '50px',
                                    backgroundColor: 'white',
                                    color: '#231F1E',
                                    fontSize: '14px',
                                    fontWeight: '700',
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                    transition: 'all 0.2s'
                                }}>
                                    Shop Now
                                </button>
                            </div>

                            {/* Image */}
                            <div style={{
                                position: 'absolute',
                                right: '-20px',
                                bottom: '-20px',
                                width: '60%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'flex-end'
                            }}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{
                                        maxWidth: '120%',
                                        maxHeight: '110%',
                                        objectFit: 'contain'
                                    }}
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;
