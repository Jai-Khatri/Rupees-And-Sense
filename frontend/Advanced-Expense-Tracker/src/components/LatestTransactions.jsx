import React from 'react';

const LatestTransactions = ({ incomeList, expenseList }) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-white mb-6">Latest Transactions</h3>
      
      {/* Display latest incomes */}
      {incomeList.length > 0 && (
        <>
          <h4 className="text-lg font-semibold text-gray-300 mb-4">Latest Incomes:</h4>
          <ul className="space-y-2 mb-8">
            {incomeList.slice(-2).map(income => (
              <li key={income._id} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg transition duration-200 hover:bg-gray-600">
                <span className="text-gray-200">
                  &#x20b9;{income.amount} on {new Date(income.date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
      
      {/* Display latest expenses */}
      {expenseList.length > 0 && (
        <>
          <h4 className="text-lg font-semibold text-gray-300 mb-4">Latest Expenses:</h4>
          <ul className="space-y-2 mb-8">
            {expenseList.slice(-2).map(expense => (
              <li key={expense._id} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg transition duration-200 hover:bg-gray-600">
                <span className="text-gray-200">
                  &#x20b9;{expense.amount} on {new Date(expense.date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default LatestTransactions;
