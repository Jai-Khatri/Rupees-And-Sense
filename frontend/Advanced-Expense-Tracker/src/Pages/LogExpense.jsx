import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import useAuthStore from '../store/useAuthStore.js';
import useFinanceStore from '../store/useFinanceStore.js';
import { toast } from 'react-toastify';

const LogExpense = () => {
    const { authUser } = useAuthStore(); // Get authenticated user information
    const { createExpense, isLoading, error } = useFinanceStore(); // Access finance store actions and state
    const [amount, setAmount] = useState(''); // State for expense amount
    const [category, setCategory] = useState(''); // State for expense category
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // State for expense date
    const [description, setDescription] = useState(''); // State for expense description

    // Predefined categories for expenses
    const categories = [
        'Food',
        'Transportation',
        'Utilities',
        'Rent',
        'Entertainment',
        'Healthcare',
        'Groceries',
        'Clothing',
        'Education',
        'Miscellaneous'
    ];

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (authUser) {
            // Attempt to create an expense
            const hasError = await createExpense(authUser._id, { amount, category, date, description });
            if (!hasError) {
                // Reset form fields on success
                setAmount('');
                setCategory('');
                setDate(new Date().toISOString().split('T')[0]);
                setDescription('');
                toast.success("Expense logged!"); // Show success message
            } else {
                toast.error(error || "Failed to log expense!"); // Show error message
            }
        } else {
            toast.error("User not authenticated!"); // Notify if user is not authenticated
        }
    };

    return (
        <>
            <Navbar /> {/* Render the navigation bar */}
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-lg p-8 bg-gray-800 rounded-lg shadow-lg mb-3">
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">Log Expense</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Amount input field */}
                        <div className="mb-5">
                            <label className="block text-gray-300 mb-1">Amount</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>
                        {/* Category selection */}
                        <div className="mb-5">
                            <label className="block text-gray-300 mb-1">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            >
                                <option value="" disabled>Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        {/* Date input field */}
                        <div className="mb-5">
                            <label className="block text-gray-300 mb-1">Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        {/* Description input field */}
                        <div className="mb-5">
                            <label className="block text-gray-300 mb-1">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        {/* Submit button */}
                        <button
                            type="submit"
                            className={`w-full border border-gray-600 ${isLoading ? 'bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'} text-white font-bold py-3 rounded transition duration=200`}
                            disabled={isLoading} 
                        >
                            {isLoading ? 'Adding...' : 'Add Expense'}
                        </button>
                    </form>
                    {/* Display error message if any */}
                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                </div>
            </div>
        </>
    );
};

export default LogExpense;
