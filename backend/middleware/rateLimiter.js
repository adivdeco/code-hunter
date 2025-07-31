// middleware/rateLimiter.js

const rateLimit = require('express-rate-limit');

const likeDislikeLimiter = rateLimit({
    windowMs: 35 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 30 requests per windowMs
    message: "Too many like/dislike requests from this IP, please try again after 35 minutes"
});

module.exports = { likeDislikeLimiter };