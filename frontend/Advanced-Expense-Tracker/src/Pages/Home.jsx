import React from 'react';
import Navbar from '../components/Navbar';
import useAuthStore from '../store/useAuthStore.js'; // Importing auth store to access user information

const Home = () => {
  const { authUser } = useAuthStore(); // Destructure authUser from the auth store

  // Get the user's name, defaulting to "User" if not available
  const userName = authUser ? authUser.name || 'User' : 'User';

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen overflow-hidden">
        <div className="text-center mb-5">
          <h1 className="text-4xl text-white">Welcome to Rupees and Sense, {userName}!</h1>
          <p className="text-gray-400 mt-4">Your very own personal expense tracker</p>
          <p className='text-gray-200 mt-2'>Click on any of the navigation buttons on the Navbar to get started!</p>
        </div>
      </div>
    </>
  );
}

export default Home;
