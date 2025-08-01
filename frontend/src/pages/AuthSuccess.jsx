// AuthSuccess.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/authSlice';
import toast from 'react-hot-toast';

const AuthSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get('token');
        if (token) {
            // Decode JWT if needed or just store
            localStorage.setItem('token', token);
            dispatch(login({ token }));
            toast.success('GitHub login successful');
            navigate('/');
        } else {
            toast.error('GitHub login failed');
            navigate('/login');
        }
    }, []);

    return <p>Logging you in via GitHub...</p>;
};

export default AuthSuccess;
