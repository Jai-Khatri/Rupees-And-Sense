import axios from "axios";

// Create an Axios instance with a predefined base URL
const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:5000': "/", // Base URL for API requests
});

// Export the Axios instance
export default axiosInstance;
