// src/components/Report.js
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

function Report() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Fetch all transactions on component load
        const allTransactions = api.getTransactions();
        setTransactions(allTransactions);
    }, []);

    // useMemo will only recalculate the report when 'transactions' state changes
    const reportData = useMemo(() => {
        const totalTransactions = transactions.length;

        const transactionsPerCategory = transactions.reduce((acc, tx) => {
            acc[tx.category] = (acc[tx.category] || 0) + 1;
            return acc;
        }, {});

        const financialSummary = transactions
            .filter(tx => tx.category === 'financial')
            .reduce((acc, tx) => {
                const amount = parseFloat(tx.data.amount) || 0;
                if (tx.data.type === 'Revenue') {
                    acc.revenue += amount;
                } else if (tx.data.type === 'Expense') {
                    acc.expense += amount;
                }
                return acc;
            }, { revenue: 0, expense: 0 });

        financialSummary.net = financialSummary.revenue - financialSummary.expense;

        return {
            totalTransactions,
            transactionsPerCategory,
            financialSummary,
        };
    }, [transactions]);

    return (
        <div className="report-container">
            <h2>System Report</h2>

            {transactions.length === 0 ? (
                <p>No data available to generate a report. <Link to="/">Add some transactions first</Link>.</p>
            ) : (
                <div className="report-grid">
                    <div className="report-card">
                        <h3>Total Transactions</h3>
                        <p className="report-value">{reportData.totalTransactions}</p>
                    </div>

                    <div className="report-card">
                        <h3>Financial Summary</h3>
                        <p>Revenue: {reportData.financialSummary.revenue.toLocaleString()} T</p>
                        <p>Expense: {reportData.financialSummary.expense.toLocaleString()} T</p>
                        <p className="report-value net-value">Net: {reportData.financialSummary.net.toLocaleString()} T</p>
                    </div>

                    <div className="report-card">
                        <h3>Transactions by Category</h3>
                        <ul>
                            {Object.entries(reportData.transactionsPerCategory).map(([category, count]) => (
                                <li key={category}><strong>{category}:</strong> {count}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <Link to="/" className="back-link">← Back to Dashboard</Link>
        </div>
    );
}

export default Report;