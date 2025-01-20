import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore.js';
import { toast } from 'react-toastify';

const Signup = () => {
  const [username, setUsername] = useState(''); // State for username input
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const { register, error, isLoading } = useAuthStore(); // Access registration function and loading/error states
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const registrationError = await register(username, email, password); // Attempt to register the user
    
    if (!registrationError) {
      navigate('/login'); // Redirect to login page on successful registration
      toast.success("Successfully created an account!"); // Show success message
    } else {
      toast.error(error || "Registration failed!"); // Show error message if registration fails
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-800 bg-opacity-80 rounded-lg shadow-lg p-8 w-11/12 sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col">
        <h1 className="text-4xl text-white text-center">Signup</h1>
        <p className="text-white mt-4 text-center">Join us! Let’s turn those pennies into plans!</p>
        <form className="mt-4 flex-grow space-y-4" onSubmit={handleSubmit}>
          {/* Username input field */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
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
          
          {/* Submit button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-8/12 border border-gray-600 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 rounded transition duration=200 mt-4"
              disabled={isLoading} 
            >
              {isLoading ? 'Registering...' : 'Signup'}
            </button>
          </div>
        </form>
        {/* Display error message if any */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        {/* Link to login page for existing users */}
        <p className="text-white text-center mt-4">
          Already have an account? 
          <Link to="/login" className="text-blue-400 hover:underline"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
