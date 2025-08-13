import axios from "axios";
import toast from "react-hot-toast";

const getBaseURL = () => {
    if (import.meta.env.MODE === "development") {
        return "http://localhost:4000/api";
    }

    // In production, use environment variable
    const apiUrl = import.meta.env.VITE_API_URL;
    if (apiUrl) {
        return `${apiUrl}/api`;
    }

    // Fallback to relative path
    return "/api";
};

export const axiosInstance = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true,
});

// Debug logging for production
if (import.meta.env.MODE !== "development") {
    console.log('[API] Production API Configuration:', {
        baseURL: getBaseURL(),
        VITE_API_URL: import.meta.env.VITE_API_URL,
        MODE: import.meta.env.MODE
    });
}

// Request interceptor for logging and token handling
axiosInstance.interceptors.request.use(
    (config) => {
        console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);

        // Add token from localStorage as fallback for cross-domain issues
        const token = localStorage.getItem('chat-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('[API] Added Authorization header');
        }

        return config;
    },
    (error) => {
        console.error('[API] Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for logging and global error handling
axiosInstance.interceptors.response.use(
    (response) => {
        console.log(`[API] ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
        return response;
    },
    (error) => {
        const { response, request, message } = error;

        if (response) {
            // Server responded with error status
            console.error(`[API] ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}:`, response.data);
        } else if (request) {
            // Request was made but no response received
            console.error('[API] Network error - no response received:', message);
            toast.error('Network error - please check your connection');
        } else {
            // Something else happened
            console.error('[API] Request setup error:', message);
            toast.error('Request failed - please try again');
        }

        return Promise.reject(error);
    }
);