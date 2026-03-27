import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import FormInput from '../components/FormInput';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import '../styles/admin.css';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [image, setImage] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setImage(userInfo.image || '');
        }
    }, []);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append('image', file);
        setUploading(true);

        try {
            const { data } = await api.post('/upload', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setImage(data.image);
            toast.success('Image uploaded successfully');
        } catch (error) {
            toast.error('Image upload failed');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const { data } = await api.put('/users/profile', {
                name,
                email,
                password,
                image
            });
            // Update local storage
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Profile Updated Successfully');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-layout">
            <Sidebar />
            <main className="main-content">
                <Header title="Admin Profile" user={{ name, image }} />
                <div className="dashboard-container">
                    <div className="table-container" style={{ maxWidth: '600px', padding: '30px', margin: '40px auto' }}>
                        <h2 style={{ marginBottom: '24px', fontSize: '20px' }}>Edit Profile</h2>

                        <form onSubmit={submitHandler}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#e2e8f0', position: 'relative' }}>
                                    {image ? (
                                        <img
                                            src={image.startsWith('http') ? image : `https://e-commerce-jh2x.onrender.com${image}`}
                                            alt="Profile"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <span style={{ fontSize: '40px', color: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>📷</span>
                                    )}
                                </div>
                            </div>

                            <div className="form-group" style={{ textAlign: 'center' }}>
                                <label htmlFor="profile-upload" className="btn btn-secondary" style={{ cursor: 'pointer' }}>
                                    {uploading ? 'Uploading...' : 'Change Profile Photo'}
                                </label>
                                <input
                                    id="profile-upload"
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                            </div>

                            <FormInput
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <FormInput
                                label="Email Address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <FormInput
                                label="New Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Leave blank to keep current"
                            />
                            <FormInput
                                label="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                            />

                            <div style={{ marginTop: '24px' }}>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Updating...' : 'Update Profile'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
