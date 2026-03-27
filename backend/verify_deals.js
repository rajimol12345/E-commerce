const BASE_URL = 'http://localhost:5000/api';

const run = async () => {
    console.log("Starting Deals & Sort Verification...");

    try {
        // 1. Verify Deals (discount > 0)
        console.log("Testing Deals Filter...");
        const resDeals = await fetch(`${BASE_URL}/products?isDeal=true`);
        const deals = await resDeals.json();
        console.log(`Deals found: ${deals.length}`);

        const invalidDeal = deals.find(p => !p.discount || p.discount <= 0);
        if (invalidDeal) {
            console.error("❌ Found non-deal product in deals list:", invalidDeal.name);
        } else {
            console.log("✅ All returned products have discount > 0");
        }

        // 2. Verify Sort (Newest)
        console.log("Testing Sort Order...");
        const resNewest = await fetch(`${BASE_URL}/products?sort=newest`);
        const newest = await resNewest.json();

        if (newest.length > 1) {
            const firstDate = new Date(newest[0].createdAt).getTime();
            const secondDate = new Date(newest[1].createdAt).getTime();
            if (firstDate >= secondDate) {
                console.log("✅ Sort order appears correct (Desc Date)");
            } else {
                console.error("❌ Sort order incorrect. First:", newest[0].createdAt, "Second:", newest[1].createdAt);
            }
        } else {
            console.log("⚠️ Not enough products to verify sort order.");
        }

    } catch (e) {
        console.error("Test Failed:", e.message);
    }
};

run();
