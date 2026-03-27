// using native fetch

// Helper to log pass/fail
const test = async (name, fn) => {
    try {
        await fn();
        console.log(`✅ ${name}`);
    } catch (e) {
        console.error(`❌ ${name}: ${e.message}`);
        // console.error(e);
    }
};

const BASE_URL = 'http://localhost:5000/api';
let token = '';

const run = async () => {
    console.log("Starting API Verification...");

    // 1. Auth Login
    await test('Login (Admin)', async () => {
        const res = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@example.com', password: '123456' })
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        token = data.token;
        if (!token) throw new Error('No token received');
    });

    // 2. Auth Me (Verify fix for 404/Logout loop)
    await test('Get Current User (Auth/Me)', async () => {
        const res = await fetch(`${BASE_URL}/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) {
            // Try /users/profile if /auth/me doesn't exist just to map it
            // But we specifically fixed /auth/me
            throw new Error(`Status ${res.status} - ${await res.text()}`);
        }
        const data = await res.json();
        if (data.email !== 'admin@example.com') throw new Error('Incorrect user returned');
    });

    // 3. Create Brand (Verify fix for Brand implementation)
    let brandId = '';
    await test('Create Brand (New Feature)', async () => {
        const res = await fetch(`${BASE_URL}/brands`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: 'TestBrand_' + Date.now(), description: 'Test Desc' })
        });
        if (!res.ok) throw new Error(`Status ${res.status} - ${await res.text()}`);
        const data = await res.json();
        brandId = data._id;
        if (data.image !== '/uploads/sample-brand.jpg') throw new Error('Default image not applied');
    });

    // 4. Delete Brand
    await test('Delete Brand', async () => {
        const res = await fetch(`${BASE_URL}/brands/${brandId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
    });

    // 5. Create Category (Verify fix for Category Image)
    await test('Create Category (Fix Verification)', async () => {
        const res = await fetch(`${BASE_URL}/categories`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: 'TestCat_' + Date.now(), description: 'Test Desc' }) // NO IMAGE
        });
        // If 500, then fix failed. If 201, fix worked (default image applied).
        if (!res.ok) throw new Error(`Status ${res.status} - ${await res.text()}`);
        const data = await res.json();
        if (data.image !== '/uploads/sample-category.jpg') throw new Error('Default image not applied');
    });
};

run();
