import React from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/admin.css';

const Table = ({ columns, data, actions, onEdit, onDelete, onView }) => {
    return (
        <div className="table-container">
            <table className="admin-table">
                <thead>
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx}>{col.header}</th>
                        ))}
                        {actions && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex}>
                                        {col.render ? col.render(item) : item[col.accessor]}
                                    </td>
                                ))}
                                {actions && (
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            {onView && (
                                                <button className="action-btn" onClick={() => onView(item)} title="View">
                                                    <FaEye />
                                                </button>
                                            )}
                                            {onEdit && (
                                                <button className="action-btn" onClick={() => onEdit(item)} title="Edit">
                                                    <FaEdit />
                                                </button>
                                            )}
                                            {onDelete && (
                                                <button className="action-btn delete" onClick={() => onDelete(item)} title="Delete">
                                                    <FaTrash />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + (actions ? 1 : 0)} style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
