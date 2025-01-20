import React, { useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, ArcElement, CategoryScale, Filler } from 'chart.js';
import Navbar from '../components/Navbar';
import useFinanceStore from '../store/useFinanceStore.js';
import useAuthStore from '../store/useAuthStore.js';
import History from '../components/History.jsx';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, ArcElement, CategoryScale, Filler);

const Graph = () => {
  const { 
    fetchTotalIncomeAndExpenses,
    fetchMaxIncomeAndExpense,
    fetchUserIncomes,
    fetchUserExpenses,
    totalIncome,
    totalExpenses,
    netIncome, 
    maxIncome,
    maxExpense,
    incomeList,
    expenseList 
  } = useFinanceStore();
  
  const { authUser } = useAuthStore();

  // Fetch financial data when the authenticated user changes
  useEffect(() => {
    if (authUser) {
      fetchTotalIncomeAndExpenses(authUser._id);
      fetchMaxIncomeAndExpense(authUser._id);
      fetchUserIncomes(authUser._id);
      fetchUserExpenses(authUser._id);
    }
  }, [authUser]);

  // Prepare data for the line chart
  const lineData = {
    labels: incomeList.map(income => new Date(income.date).toLocaleDateString()), // Dates for the x-axis
    datasets: [
      {
        label: 'Income',
        data: incomeList.map(income => income.amount), // Income amounts for the y-axis
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Expenses',
        data: expenseList.map(expense => expense.amount), // Expense amounts for the y-axis
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  // Prepare data for the pie chart
  const pieData = {
    labels: ['Total Income', 'Total Expenses'],
    datasets: [
      {
        data: [totalIncome || 0, totalExpenses || 0], // Total income and expenses
        backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4">
        <div className="flex flex-col w-full md:w-2/3 lg:w-3/5 max-w-lg mb-8">
          <h3 className="text-xl text-white mb-4">Income and Expenses Over Time</h3>
          <div className="h-64 md:h-80 lg:h-96">
            <Line data={lineData} options={{ maintainAspectRatio: false }} />
          </div>
          
          <h3 className="text-xl text-white mb-4 mt-8">Income vs Expenses</h3>
          <div className="h-64 md:h-80 lg:h-96">
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="flex flex-col w-full md:w-1/3 lg:w-2/5 max-w-lg p-4 bg-gray-800 rounded-lg shadow-lg mt-6 md:mt-0 md:ml-6">
          <h2 className="text-3xl font-bold text-white mb-6">Financial Overview</h2>

          {/* Display financial metrics if there are incomes or expenses */}
          {incomeList.length > 0 || expenseList.length > 0 ? (
            <>
              {maxIncome > 0 && (
                <p className="text-white mt-4 text-lg">Maximum Income: <span className="font-bold">&#x20b9;{maxIncome}</span></p>
              )}
              
              {maxExpense > 0 && (
                <p className="text-white mt-4 text-lg">Maximum Expense: <span className="font-bold">&#x20b9;{maxExpense}</span></p>
              )}
              
              {netIncome >= 0 ? (
                <p className="text-green-400 mt-4 text-lg">Net Income: <span className="font-bold">&#x20b9;{netIncome}</span></p>
              ) : (
                <p className="text-red-400 mt-4 text-lg">Net Loss: <span className="font-bold">${Math.abs(netIncome)}</span></p>
              )}
            </>
          ) : (
            <p className="text-white text-lg text-center">
              Log your expenses and income and check back to see your graphs.
            </p>
          )}

          {/* Render the transaction history component */}
          <History />
        </div>
      </div>
      
    </>
  );
};

export default Graph;
