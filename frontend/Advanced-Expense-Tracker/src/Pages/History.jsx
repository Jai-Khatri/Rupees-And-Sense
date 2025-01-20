import React, { useEffect, useState } from 'react';
import useFinanceStore from '../store/useFinanceStore.js';
import useAuthStore from '../store/useAuthStore.js'; 
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar.jsx';

// TransactionItem Component for rendering individual income/expense items
const TransactionItem = ({ transaction, onDelete }) => (
  <li className="flex flex-col sm:flex-row justify-between items-start bg-gray-700 p-4 rounded-lg transition duration-200 hover:bg-gray-600">
    <div className="flex-grow mb-2 sm:mb-0">
      <span className="text-white">
        &#x20b9;{transaction.amount} on {new Date(transaction.date).toLocaleDateString()} 
        <span className="text-gray-400"> - {transaction.category}</span>
      </span>
      {transaction.description && (
        <p className="text-gray-300 mt-1">{transaction.description}</p>
      )}
    </div>
    <button 
      onClick={() => onDelete(transaction._id)} 
      className="text-red-500 hover:text-red-700 transition duration-200"
    >
      Delete
    </button>
  </li>
);

const History = () => {
  const {
    incomeList,
    expenseList,
    deleteIncome,
    deleteExpense,
    fetchUserIncomes,
    fetchUserExpenses,
    error, 
  } = useFinanceStore();
  
  const { authUser } = useAuthStore(); 

  // Local state for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch user incomes and expenses when the component mounts or authUser changes
  useEffect(() => {
    if (authUser) {
      fetchUserIncomes(authUser._id);
      fetchUserExpenses(authUser._id);
    }
  }, [authUser, fetchUserIncomes, fetchUserExpenses]);

  // Handle income deletion
  const handleDeleteIncome = async (incomeId) => {
    const error = await deleteIncome(authUser._id, incomeId);
    toast[!error ? 'success' : 'error'](!error ? "Income deleted successfully!" : 'Failed to delete income. Please try again.');
  };

  // Handle expense deletion
  const handleDeleteExpense = async (expenseId) => {
    const error = await deleteExpense(authUser._id, expenseId);
    toast[!error ? 'success' : 'error'](!error ? 'Expense deleted successfully' : 'Failed to delete expense. Please try again.');
  };

  // Filter incomes based on category
  const filteredIncomes = incomeList.filter(income =>
    income.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter expenses based on category
  const filteredExpenses = expenseList.filter(expense =>
    expense.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar/>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-2xl text-white mb-6 text-center">History</h3>
        
        {/* Search Bar for filtering transactions */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Flex container for displaying incomes and expenses */}
        <div className="flex flex-col sm:flex-row justify-between">
          {/* Incomes section */}
          <div className="w-full sm:w-1/2 pr-0 sm:pr-2 mb-4 sm:mb-0">
            <h4 className="text-xl text-white mb-2">Incomes</h4>
            {filteredIncomes.length > 0 ? (
              <ul className="space-y-4">
                {filteredIncomes.map(income => (
                  <TransactionItem key={income._id} transaction={income} onDelete={handleDeleteIncome} />
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No incomes logged.</p>
            )}
          </div>

          {/* Expenses section */}
          <div className="w-full sm:w-1/2 pl-0 sm:pl-2">
            <h4 className="text-xl text-white mb-2">Expenses</h4>
            {filteredExpenses.length > 0 ? (
              <ul className="space-y-4">
                {filteredExpenses.map(expense => (
                  <TransactionItem key={expense._id} transaction={expense} onDelete={handleDeleteExpense} />
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No expenses logged.</p>
            )}
          </div>
        </div>

        {/* Display any errors */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </>
  );
};

export default History;
