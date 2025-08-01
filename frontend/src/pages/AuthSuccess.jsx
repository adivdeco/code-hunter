// // AuthSuccess.jsx
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../authSlice';
// import toast from 'react-hot-toast';

// const AuthSuccess = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const token = new URLSearchParams(window.location.search).get('token');
//         if (token) {
//             // Decode JWT if needed or just store
//             localStorage.setItem('token', token);
//             dispatch(login({ token }));
//             toast.success('GitHub login successful');
//             navigate('/');
//         } else {
//             toast.error('GitHub login failed');
//             navigate('/login');
//         }
//     }, []);

//     return <p>Logging you in via GitHub...</p>;
// };

// export default AuthSuccess;

// src/pages/AuthSuccess.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../authSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AuthSuccess() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get('token');

        if (token) {
            // Set secure cookie via JS (since backend can't from a redirect)
            document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=None; Secure`;

            // Now re-check login via backend (this will hydrate Redux)
            dispatch(checkAuth())
                .unwrap()
                .then(() => {
                    toast.success("GitHub login successful!");
                    navigate('/dashbord'); // or redirect to last visited page
                })
                .catch(() => {
                    toast.error("Error verifying session");
                    navigate('/login');
                });
        } else {
            toast.error("GitHub login failed");
            navigate('/login');
        }
    }, [dispatch, navigate]);

    return <p className="text-white text-center mt-20">Logging in via GitHub...</p>;
}
