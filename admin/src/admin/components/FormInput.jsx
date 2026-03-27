import React from 'react';
import '../styles/admin.css';

const FormInput = ({ label, type = 'text', name, value, onChange, placeholder, required = false, rows }) => {
    return (
        <div className="form-group">
            <label className="form-label">{label} {required && <span style={{ color: 'red' }}>*</span>}</label>
            {type === 'textarea' ? (
                <textarea
                    className="form-textarea"
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={rows || 3}
                    required={required}
                />
            ) : (
                <input
                    type={type}
                    className="form-input"
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                />
            )}
        </div>
    );
};

export default FormInput;
