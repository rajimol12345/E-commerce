import React from 'react';
import '../styles/admin.css';

const StatCard = ({ title, value, icon, link }) => {
    return (
        <div className="stat-card">
            <div className="stat-header">
                <div className="stat-icon">
                    {icon}
                </div>
            </div>
            <div className="stat-content">
                <div className="stat-value">{value}</div>
                <div className="stat-label">{title}</div>
            </div>
        </div>
    );
};

export default StatCard;
