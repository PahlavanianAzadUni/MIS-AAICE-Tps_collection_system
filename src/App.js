// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
// Import the component you created
import TPSForm from './components/TPSForm';
import TransactionList from './components/TransactionList';
import Report from './components/Report';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>TPS Web System of AAICE</h1>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        {/* Enable the route to the form */}
                        <Route path="/form/:category" element={<TPSForm />} />
                        <Route path="/transactions" element={<TransactionList />} />
                        <Route path="/report" element={<Report />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;