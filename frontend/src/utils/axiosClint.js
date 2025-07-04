import axios from "axios"

const axiosClient = axios.create({
    baseURL: 'http://localhost:5500',
    // baseURL: 'https://code-hunter-1l2w.vercel.app',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;

// import.meta.env.VITE_API_URL || 