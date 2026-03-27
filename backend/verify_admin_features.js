// using native fetch

// Helper to log pass/fail
const test = async (name, fn) => {
    try {
        await fn();
        console.log(`✅ ${name}`);
    } catch (e) {
        console.error(`❌ ${name}: ${e.message}`);
        if (e.cause) console.error(e.cause);
    }
};

const BASE_URL = 'http://localhost:5000/api';
let token = '';

const run = async () => {
    console.log("Starting Admin Feature Verification...");

    // 1. Auth Login (Admin)
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

    if (!token) {
        console.error("Skipping remaining tests due to login failure");
        return;
    }

    const authHeaders = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    // 2. Verify Users List & Delete
    let userIdToDelete = null;
    await test('Get Users List', async () => {
        const res = await fetch(`${BASE_URL}/users`, { headers: authHeaders });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const users = await res.json();
        if (!Array.isArray(users)) throw new Error('Response is not an array');

        // Find a non-admin user to delete (create one if needed, but let's check existing)
        const target = users.find(u => u.email === 'user@example.com');
        if (target) {
            userIdToDelete = target._id;
        } else {
            console.log("   (Creating temp user for deletion test)");
            // Create user to delete
            const createRes = await fetch(`${BASE_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: 'DeleteMe', email: 'deleteme@example.com', password: '123456', role: 'user' })
            });
            const newUser = await createRes.json();
            userIdToDelete = newUser._id;
        }
    });

    if (userIdToDelete) {
        await test('Delete User', async () => {
            const res = await fetch(`${BASE_URL}/users/${userIdToDelete}`, {
                method: 'DELETE',
                headers: authHeaders
            });
            if (!res.ok) throw new Error(`Status ${res.status}`);
        });
    }

    // 3. Verify Orders Logic
    let orderId = null;
    await test('Create Test Order', async () => {
        const res = await fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: authHeaders, // Admin can create orders too
            body: JSON.stringify({
                orderItems: [{ name: 'Test Product', qty: 1, image: 'test.jpg', price: 10, product: '67972ba211a1084b4cc80327' }], // using random ID, might fail if product validation exists
                shippingAddress: { address: '123 Main St', city: 'Test City', postalCode: '12345', country: 'Test Country' },
                paymentMethod: 'PayPal',
                itemsPrice: 10,
                taxPrice: 2,
                shippingPrice: 5,
                totalPrice: 17
            })
        });
        // Note: product ID must be valid usually. 
        // If this fails, we might need to fetch a product first.
        // Let's assume it might fail if ID validation is strict in model?
        // Model usually just checks ObjectId format, but if we populate, it needs to exist?
        // Controller doesn't check product existence explicitly in `addOrderItems`.

        if (!res.ok) throw new Error(`Status ${res.status} - ${await res.text()}`);
        const data = await res.json();
        orderId = data._id;
    });

    if (orderId) {
        await test('Get Orders (Admin)', async () => {
            const res = await fetch(`${BASE_URL}/orders`, { headers: authHeaders });
            if (!res.ok) throw new Error(`Status ${res.status}`);
            const orders = await res.json();
            if (!Array.isArray(orders)) throw new Error('Response is not an array');
            const found = orders.find(o => o._id === orderId);
            if (!found) throw new Error('Created order not found in list');
        });

        await test('Mark Order Delivered', async () => {
            const res = await fetch(`${BASE_URL}/orders/${orderId}/deliver`, {
                method: 'PUT',
                headers: authHeaders
            });
            if (!res.ok) throw new Error(`Status ${res.status} - ${await res.text()}`);
            const updated = await res.json();
            if (!updated.isDelivered) throw new Error('Order not marked delivered');
        });
    }
};

run();
