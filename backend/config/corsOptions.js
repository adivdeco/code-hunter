// A centralized place for CORS configuration to be used by Express and Socket.io

const getCorsOptions = () => {
    // Default to an empty array if the environment variable is not set
    const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [];

    return {
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            // Allow if the origin is in our list
            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true, // Allow cookies, authorization headers, etc.
    };
};

module.exports = { getCorsOptions };