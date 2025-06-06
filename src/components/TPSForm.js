// src/components/TPSForm.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api'; // <-- IMPORT THE API SERVICE

// (The categoryFields object remains exactly the same, so it's omitted here for brevity)
const categoryFields = {
    educational: [
        { name: 'activityName', label: 'Activity Name', type: 'text' },
        { name: 'attendees', label: 'Number of Attendees', type: 'number' },
        { name: 'satisfaction', label: 'Satisfaction Rating (1-5)', type: 'number', min: 1, max: 5 },
    ],
    media: [
        { name: 'contentTitle', label: 'Content Title', type: 'text' },
        { name: 'contentType', label: 'Content Type (e.g., Video, Article)', type: 'text' },
        { name: 'views', label: 'Views/Downloads', type: 'number' },
    ],
    financial: [
        { name: 'transactionTitle', label: 'Transaction Title', type: 'text' },
        { name: 'type', label: 'Type', type: 'select', options: ['Revenue', 'Expense'] },
        { name: 'amount', label: 'Amount (in Toman)', type: 'number' },
    ],
    hr: [
        { name: 'memberName', label: 'Member Name', type: 'text' },
        { name: 'activity', label: 'Activity (e.g., Joined, Participated)', type: 'text' },
        { name: 'hours', label: 'Hours Contributed', type: 'number' },
    ],
    external: [
        { name: 'orgName', label: 'Organization Name', type: 'text' },
        { name: 'engagementType', label: 'Engagement Type (e.g., Collaboration)', type: 'text' },
        { name: 'outcome', label: 'Outcome/Result', type: 'textarea' },
    ],
};


function TPSForm() {
    const { category } = useParams();
    const navigate = useNavigate();
    const fields = categoryFields[category] || [];

    const initialState = fields.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // --- UPDATED SUBMIT HANDLER ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        const transactionData = {
            // Add a unique ID for each transaction, useful for lists
            id: Date.now(),
            category: category,
            timestamp: new Date().toISOString(),
            data: formData
        };

        try {
            // Use the api service to submit the data
            await api.submitTransaction(transactionData);
            alert('Transaction saved successfully!');
            navigate('/'); // Go back to the dashboard
        } catch (error) {
            alert('Failed to save transaction. See console for details.');
            console.error('Submission failed:', error);
        }
    };
    // -----------------------------

    if (fields.length === 0) {
        return <div>Invalid category selected.</div>;
    }

    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

    return (
        <form onSubmit={handleSubmit} className="tps-form">
            <h2>New Transaction: {categoryName}</h2>
            {fields.map(field => (
                <div key={field.name} className="form-group">
                    <label htmlFor={field.name}>{field.label}</label>
                    {field.type === 'select' ? (
                        <select name={field.name} value={formData[field.name]} onChange={handleChange} required>
                            <option value="">Select a {field.label}</option>
                            {field.options.map(option => <option key={option} value={option}>{option}</option>)}
                        </select>
                    ) : field.type === 'textarea' ? (
                        <textarea name={field.name} value={formData[field.name]} onChange={handleChange} required />
                    ) : (
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            min={field.min}
                            max={field.max}
                            required
                        />
                    )}
                </div>
            ))}
            <button type="submit">Submit Transaction</button>
        </form>
    );
}

export default TPSForm;