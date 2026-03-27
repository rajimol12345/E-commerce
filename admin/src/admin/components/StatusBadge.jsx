import React from 'react';
import '../styles/admin.css';

const StatusBadge = ({ status }) => {
    let type = 'info';

    // Normalize status string
    const s = status ? status.toLowerCase() : '';

    if (['paid', 'delivered', 'active', 'completed'].includes(s)) type = 'success';
    if (['pending', 'processing', 'inactive'].includes(s)) type = 'warning';
    if (['cancelled', 'blocked', 'failed', 'deleted'].includes(s)) type = 'danger';

    return (
        <span className={`status-badge status-${type}`}>
            {status}
        </span>
    );
};

export default StatusBadge;
