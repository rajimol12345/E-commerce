const BASE_URL = 'http://localhost:5000/api';

const run = async () => {
    console.log("Starting Search Verification (Debug Mode)...");

    try {
        // 1. Get All Products
        const resAll = await fetch(`${BASE_URL}/products`);
        const products = await resAll.json();
        console.log(`Total Products in DB: ${products.length}`);

        if (products.length === 0) throw new Error('No products seeded to test search');

        const targetProduct = products[0];
        const keyword = targetProduct.name.split(' ')[0];
        console.log(`Targeting product: "${targetProduct.name}", Keyword: "${keyword}"`);

        // 2. Search for keyword
        const resSearch = await fetch(`${BASE_URL}/products?keyword=${keyword}`);
        const searchResults = await resSearch.json();
        console.log(`Search for "${keyword}" returned ${searchResults.length} results.`);

        // 3. Search for nonsense
        const resEmpty = await fetch(`${BASE_URL}/products?keyword=xyz123nonsense`);
        const emptyResults = await resEmpty.json();
        console.log(`Search for "xyz123nonsense" returned ${emptyResults.length} results.`);

        if (emptyResults.length > 0) {
            console.log("Products found for nonsense:", JSON.stringify(emptyResults, null, 2));
        }

    } catch (e) {
        console.error("Test Failed:", e.message);
    }
};

run();
