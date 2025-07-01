import axios from "axios"

const axiosClient =  axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5500',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;

