import axios from "axios";
// const apiUrl = process.env.REACT_APP_API_URL;
// const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY;
// const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL:"http://localhost:5000",

  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Add interceptor for token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;