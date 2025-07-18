// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function useUserStats(userId) {
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`/api/user/${userId}/stats`);
//                 setUserData(response.data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [userId]);

//     return { userData, loading, error };
// }