// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TPSForm from './components/TPSForm';
import TransactionList from './components/TransactionList';
import Report from './components/Report';
import Footer from './components/Footer'; // 1. Import the Footer
import './App.css';

function App() {
    return (
        <Router>
            <div className="App-container"> {/* A wrapper to help position the footer */}
                <header className="App-header">
                    <h1>TPS Web System - AI & CE Student Association</h1>
                </header>
                <main className="App-content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/form/:category" element={<TPSForm />} />
                        <Route path="/transactions" element={<TransactionList />} />
                        <Route path="/report" element={<Report />} />
                    </Routes>
                </main>
                <Footer /> {/* 2. Add the Footer component here */}
            </div>
        </Router>
    );
}

export default App;