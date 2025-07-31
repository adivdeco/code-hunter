// // A centralized place for CORS configuration to be used by Express and Socket.io

// const getCorsOptions = () => {
//     // Default to an empty array if the environment variable is not set
//     const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [];

//     return {
//         origin: (origin, callback) => {
//             // Allow requests with no origin (like mobile apps or curl requests)
//             if (!origin) return callback(null, true);

//             // Allow if the origin is in our list
//             if (allowedOrigins.indexOf(origin) !== -1) {
//                 callback(null, true);
//             } else {
//                 callback(new Error('Not allowed by CORS'));
//             }
//         },
//         credentials: true,
//     };
// };

// module.exports = { getCorsOptions };

// A centralized place for CORS configuration to be used by Express and Socket.io

// const getCorsOptions = () => {
//     // Default to an empty array if the environment variable is not set
//     const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [];

//     // During local development, it's helpful to always include the common Vite port
//     if (process.env.NODE_ENV !== 'production' && !allowedOrigins.includes('http://localhost:5173')) {
//         allowedOrigins.push('http://localhost:5173');
//     }

//     return {
//         origin: (origin, callback) => {
//             // Allow requests with no origin (like mobile apps or curl requests)
//             if (!origin) return callback(null, true);

//             // Allow if the origin is in our list
//             if (allowedOrigins.indexOf(origin) !== -1) {
//                 callback(null, true);
//             } else {
//                 callback(new Error(`CORS Error: The origin '${origin}' is not allowed.`));
//             }
//         },
//         credentials: true,

//         // ✅ --- ADDED SECTION --- ✅

//         // 1. Specify which methods are allowed from the allowed origins.
//         // This is crucial for PUT, POST, DELETE requests.
//         methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",

//         // 2. Specify which headers the browser is allowed to send.
//         // 'Content-Type' is essential for file uploads.
//         // 'Authorization' is essential if you send JWT tokens in headers.
//         allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     };
// };

// module.exports = { getCorsOptions };

const getCorsOptions = () => {
    const allowedOrigins = [
        'http://localhost:5173',
        'https://code-hunter-backend.onrender.com',
        'https://code-hunter-*.vercel.app', // Wildcard for Vercel preview URLs
        'https://your-production-domain.com' // Add your production domain
    ];

    return {
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            // Allow if the origin matches any allowed pattern
            if (allowedOrigins.some(allowed =>
                origin === allowed ||
                origin.startsWith(allowed.replace('*', ''))
            )) {
                return callback(null, true);
            }

            callback(new Error(`CORS Error: The origin '${origin}' is not allowed.`));
        },
        credentials: true,
        methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    };
};

module.exports = { getCorsOptions };