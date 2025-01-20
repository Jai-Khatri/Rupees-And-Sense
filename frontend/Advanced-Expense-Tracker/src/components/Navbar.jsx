import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ExpenseIcon from '../assets/Expense.png';
import IncomeIcon from '../assets/savings.png';
import LogoutIcon from '../assets/logout.png';
import GraphsIcon from '../assets/graph.png';
import HistoryIcon from '../assets/history.png';
import LoginIcon from '../assets/login.png';
import useAuthStore from '../store/useAuthStore.js';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage menu visibility
  const { isAuthenticated, logout } = useAuthStore(); // Get authentication state and logout function
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Toggle the mobile menu open/closed
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle user logout
  const handleLogout = () => {
    logout(); // Call the logout function
    navigate('/login'); // Redirect to login page
    toast.success("Successfully logged out!"); // Show success message
  };

  return (
    <div className="bg-gray-800 p-5">
      <nav className="flex items-center justify-between p-4 h-16 relative">
        <div>
          <h1 className="text-white text-3xl font-bold">Rupees and Sense</h1>
          <h3 className="text-gray-300">Expense Tracker</h3>
        </div>

        {/* Mobile menu toggle button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? '✖' : '☰'}
          </button>
        </div>

        {/* Navigation links */}
        <ul
          className={`md:flex md:flex-row md:items-center md:gap-8 ${
            isOpen ? 'flex' : 'hidden'
          } bg-gray-800 w-full md:w-auto space-x-6 rounded-md shadow-lg absolute md:static top-16 left-0 flex-wrap mt-4`}
        >

          {isAuthenticated && (
             <li className="text-white py-2 p-4 md:p-2 hover:bg-gray-700 cursor-pointer rounded transition duration-300 flex items-center">
             <Link to="/history" className="flex items-center">
               <img src={HistoryIcon} alt="History Icon" className="w-8 h-8 mr-2" />
               History
             </Link>
           </li>
          )}

          {/* Graphs and Reports link (visible if authenticated) */}
          {isAuthenticated && (
            <li className="text-white py-2 p-4 md:p-2 hover:bg-gray-700 cursor-pointer rounded transition duration-300 flex items-center">
              <Link to="/graph" className="flex items-center">
                <img src={GraphsIcon} alt="Graphs Icon" className="w-8 h-8 mr-2" />
                Graphs and Reports
              </Link>
            </li>
          )}

          {/* Links for logging expenses and income (visible if authenticated) */}
          {isAuthenticated && (
            <>
              <li className="text-white py-2 p-4 md:p-2 hover:bg-gray-700 cursor-pointer rounded transition duration-300 flex items-center">
                <Link to="/logExpense" className="flex items-center">
                  <img src={ExpenseIcon} alt="Expenses Icon" className="w-8 h-8 mr-2" />
                  Log your Expenses
                </Link>
              </li>
              <li className="text-white py-2 p-4 md:p-2 hover:bg-gray-700 cursor-pointer rounded transition duration-300 flex items-center">
                <Link to="/logIncome" className="flex items-center">
                  <img src={IncomeIcon} alt="Income Icon" className="w-8 h-8 mr-2" />
                  Log your Income
                </Link>
              </li>
            </>
          )}

          {/* Logout or Login link based on authentication state */}
          {isAuthenticated ? (
            <li
              onClick={handleLogout}
              className="text-white py-2 p-4 md:p-2 hover:bg-gray-700 cursor-pointer rounded transition duration-300 flex items-center"
            >
              <img src={LogoutIcon} alt="Logout Icon" className="w-8 h-8 mr-2" />
              Log out
            </li>
          ) : (
            <li className="text-white py-2 p-4 md:p-2 hover:bg-gray-700 cursor-pointer rounded transition duration-300 flex items-center">
              <Link to="/login" className="flex items-center">
                <img src={LoginIcon} alt="Login Icon" className="w-8 h-8 mr-2" />
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
