import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        // pre-hashed '123456' using 10 salt rounds to avoid double hashing issues if we used save(), 
        // but since insertMany doesn't trigger pre-save, this is fine. 
        // Actually, let's keep it straight string and let logic handle it if we loop, 
        // OR manually hash it here. Let's manually hash it here.
        password: bcrypt.hashSync('123456', 10),
        role: 'admin',
    },
    {
        name: 'John Doe',
        email: 'user@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'user',
    },
];

export default users;
