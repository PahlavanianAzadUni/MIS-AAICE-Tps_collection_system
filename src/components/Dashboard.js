// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const tpsCategories = [
    { id: 'educational', name: 'Educational & Scientific Activities' },
    { id: 'media', name: 'Media & Content Production' },
    { id: 'financial', name: 'Financial Transactions' },
    { id: 'hr', name: 'Human Resources & Participation' },
    { id: 'external', name: 'Inter-Organizational Engagement' },
];

function Dashboard() {
    return (
        <div>
            <div className="dashboard-actions">
                <Link to="/transactions" className="action-button">View All Transactions</Link>
                <Link to="/report" className="action-button secondary">Generate Report</Link>
            </div>
            <h2>Select a Category to Add a Transaction</h2>
            <div className="dashboard-grid">
                {tpsCategories.map(category => (
                    <Link to={`/form/${category.id}`} key={category.id} className="category-card">
                        {category.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;