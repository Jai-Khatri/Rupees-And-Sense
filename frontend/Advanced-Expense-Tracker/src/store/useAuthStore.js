import { create } from 'zustand';
import axiosInstance from '../libs/axios.js';

const useAuthStore = create((set) => ({
  authUser: null, // Currently authenticated user
  isAuthenticated: false, // Authentication status
  isLoading: false, // Loading state for async actions
  error: null, // Error message for failed actions

  // Login function to authenticate user
  login: async (email, password) => {
    set({ isLoading: true, error: null }); // Set loading state and clear errors
    try {
        const response = await axiosInstance.post('/api/loginUser', { email, password });
        if (response.status === 200) {
            set({
                authUser: response.data.user, // Store user data on successful login
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
            return false; // No error occurred
        }
    } catch (error) {
        set({
            isLoading: false,
            error: error.response ? error.response.data.message : 'Login failed', // Handle error messages
        });
        return true; // An error occurred
    }
},

  // Logout function to clear user data
  logout: () => {
    set({ authUser: null, isAuthenticated: false }); // Reset authentication state
  },

  // Register function to create a new user account
  register: async (name, email, password) => {
    set({ isLoading: true, error: null }); // Set loading state and clear errors
    try {
        const response = await axiosInstance.post('/api/createUser', { name, email, password });
        if (response.status === 201) {
            set({
                authUser: response.data.user, // Store user data on successful registration
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
            return false; // No error occurred
        }
    } catch (error) {
        set({
            isLoading: false,
            error: error.response ? error.response.data.message : 'Registration failed', // Handle error messages
        });
        return true; // An error occurred
    }
},

  // Fetch user data by ID
  fetchUserData: async (id) => {
    set({ isLoading: true }); // Set loading state
    try {
      const response = await axiosInstance.get(`/api/users/${id}`);
      set({ authUser: response.data, isLoading: false }); // Store fetched user data
    } catch (error) {
      set({ isLoading: false, error: 'Failed to fetch user data' }); // Handle errors during fetch
    }
  },
}));

export default useAuthStore; // Exporting the store 
