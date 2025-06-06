// src/services/api.js

// --- THE MAGIC TOGGLE ---
// Set this to `true` to use the backend, `false` to use localStorage.
const useBackend = false;
// -----------------------

const backendUrl = 'http://localhost:5000'; // Default URL for your Flask backend

// This is the key we'll use to store data in the browser's localStorage.
const LOCAL_STORAGE_KEY = 'transactions';

export const api = {
    /**
     * Submits a new transaction.
     * If useBackend is true, it sends a POST request to the backend.
     * If useBackend is false, it saves the data to localStorage.
     * @param {object} transactionData - The transaction object to be saved.
     */
    async submitTransaction(transactionData) {
        if (useBackend) {
            // --- Backend Logic ---
            // This will try to send data to your Python server.
            // It will fail until we build and run the backend, which is expected.
            try {
                const response = await fetch(`${backendUrl}/transactions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(transactionData),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return await response.json();
            } catch (error) {
                console.error('Failed to submit transaction to backend:', error);
                // We could add a fallback to localStorage here if needed.
                throw error;
            }
        } else {
            // --- Frontend-Only Logic (localStorage) ---
            console.log('Using localStorage to save transaction.');
            const allTransactions = this.getTransactions(); // 'this' refers to the api object
            allTransactions.push(transactionData);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allTransactions));
            return transactionData; // Simulate a successful API response
        }
    },

    /**
     * Retrieves all transactions.
     * If useBackend is true, it sends a GET request to the backend.
     * If useBackend is false, it reads the data from localStorage.
     */
    getTransactions() {
        if (useBackend) {
            // --- Backend Logic ---
            // This will fail until the backend is running.
            try {
                return fetch(`${backendUrl}/transactions`).then(res => res.json());
            } catch (error) {
                console.error('Failed to fetch transactions from backend:', error);
                return []; // Return empty array on failure
            }
        } else {
            // --- Frontend-Only Logic (localStorage) ---
            const data = localStorage.getItem(LOCAL_STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        }
    },
};