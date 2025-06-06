// src/components/TransactionList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

// A helper function to format the transaction data for display
const formatTransactionData = (data) => {
    return Object.entries(data)
        .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1')}: ${value}`) // Add space before capital letters and show value
        .join(', ');
};

function TransactionList() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Fetch transactions from the API service when the component loads
        const savedTransactions = api.getTransactions();
        setTransactions(savedTransactions);
    }, []); // The empty array [] means this effect runs only once

    return (
        <div className="transaction-list-container">
            <h2>All Recorded Transactions</h2>

            {transactions.length === 0 ? (
                <p>No transactions recorded yet. <Link to="/">Add one now</Link>.</p>
            ) : (
                <table className="transaction-table">
                    <thead>
                    <tr>
                        <th>Category</th>
                        <th>Date & Time</th>
                        <th>Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map(tx => (
                        <tr key={tx.id}>
                            <td>{tx.category}</td>
                            <td>{new Date(tx.timestamp).toLocaleString('en-US')}</td>
                            <td>{formatTransactionData(tx.data)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <Link to="/" className="back-link">← Back to Dashboard</Link>
        </div>
    );
}

export default TransactionList;