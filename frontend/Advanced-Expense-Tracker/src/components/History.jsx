import React, { useEffect } from 'react';
import useFinanceStore from '../store/useFinanceStore.js';
import useAuthStore from '../store/useAuthStore.js'; 
import { toast } from 'react-toastify';

const History = () => {
  // Destructure necessary state and actions from the finance store
  const {
    incomeList,
    expenseList,
    deleteIncome,
    deleteExpense,
    fetchUserIncomes,
    fetchUserExpenses,
    error, 
  } = useFinanceStore();
  
  // Get authenticated user information from the auth store
  const { authUser } = useAuthStore(); 

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
    if (!error) {
      toast.success("Income deleted successfully!");
    } else {
      toast.error('Failed to delete income. Please try again.');
    }
  };

  // Handle expense deletion
  const handleDeleteExpense = async (expenseId) => {
    const error = await deleteExpense(authUser._id, expenseId);
    if (!error) {
      toast.success('Expense deleted successfully');
    } else {
      toast.error('Failed to delete expense. Please try again.');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-2xl text-white mb-6 text-center">History</h3>
      
      {/* Incomes section */}
      <div className="mb-6">
        <h4 className="text-xl text-white mb-2">Incomes</h4>
        {incomeList.length > 0 ? (
          <ul className="space-y-4">
            {incomeList.map(income => (
              <li key={income._id} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg transition duration-200 hover:bg-gray-600">
                <div className="flex-grow">
                  <span className="text-white">
                  &#x20b9;{income.amount} on {new Date(income.date).toLocaleDateString()} 
                    <span className="text-gray-400"> - {income.category}</span>
                  </span>
                  {income.description && (
                    <p className="text-gray-300 mt-1">{income.description}</p>
                  )}
                </div>
                <button 
                  onClick={() => handleDeleteIncome(income._id)} 
                  className="text-red-500 hover:text-red-700 transition duration-200 ml-4"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No incomes logged.</p>
        )}
      </div>

      {/* Expenses section */}
      <div>
        <h4 className="text-xl text-white mb-2">Expenses</h4>
        {expenseList.length > 0 ? (
          <ul className="space-y-4">
            {expenseList.map(expense => (
              <li key={expense._id} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg transition duration-200 hover:bg-gray-600">
                <div className="flex-grow">
                  <span className="text-white">
                  &#x20b9;{expense.amount} on {new Date(expense.date).toLocaleDateString()} 
                    <span className="text-gray-400"> - {expense.category}</span>
                  </span>
                  {expense.description && (
                    <p className="text-gray-300 mt-1">{expense.description}</p>
                  )}
                </div>
                <button 
                  onClick={() => handleDeleteExpense(expense._id)} 
                  className="text-red-500 hover:text-red-700 transition duration-200 ml-4"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No expenses logged.</p>
        )}
      </div>

      {/* Display any errors */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default History;
