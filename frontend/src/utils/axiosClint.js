import axios from "axios"

const axiosClient = axios.create({
    // baseURL: 'http://localhost:5500',
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;

// import.meta.env.VITE_API_URL || 