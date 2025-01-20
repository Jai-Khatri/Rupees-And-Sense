import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const { login, isLoading, error } = useAuthStore(); // Access login function and loading/error states
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const loginError = await login(email, password); // Attempt to log in

    if (!loginError) {
        navigate('/'); // Redirect to home on successful login
        toast.success("Login successful!"); // Show success message
    } else { 
        toast.error(error || "Couldn't login!"); // Show error message if login fails
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-800 bg-opacity-80 rounded-lg shadow-lg p-8 w-11/12 sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col">
        <h1 className="text-4xl text-white text-center">Login</h1>
        <p className="text-white mt-4 text-center">Welcome back! Ready to track your expenses like a pro?</p>
        <form className="mt-4 flex-grow space-y-4" onSubmit={handleSubmit}>
          {/* Email input field */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
          {/* Password input field */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
          <div className="flex justify-center">
            {/* Submit button */}
            <button
              type="submit"
              className="w-8/12 border border-gray-600 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 rounded transition duration-200 mt-4"
              disabled={isLoading} 
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        {/* Display error message if any */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Link to signup page for new users */}
        <p className="text-white text-center mt-4">
          Don't have an account? 
          <Link to="/signup" className="text-blue-400 hover:underline"> Make one!</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
