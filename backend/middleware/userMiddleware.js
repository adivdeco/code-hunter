
// const jwt = require('jsonwebtoken');
// const User = require('../models/userSchema');
// const redisClient = require('../config/redis');


// const userMiddleware = async (req, res, next) => {

//     try {

//         const { token } = req.cookies;

//         if (!token) {
//             return res.status(401).send("tocken is not provided");
//         }


//         const payload = jwt.verify(token, "secretkey")


//         const { _id } = payload;
//         if (!_id) {
//             return res.status(401).send("Unauthorized: Invalid token payload");
//         }

//         const finduser = await User.findById(_id);
//         if (!finduser) {
//             return res.status(404).send("User not found");
//         }

//         const IsBlocked = await redisClient.exists(`blocked:${token}`);

//         if (IsBlocked) {
//             return res.status(403).send("Forbidden: User is blocked");
//         }
//         req.finduser = finduser; // Attach the found user to the response object
//         next();


//     }
//     catch (err) {
//         res.status(500).send("Error: " + err.message);
//     }
// }

// module.exports = userMiddleware;




// const jwt = require('jsonwebtoken');
// const User = require('../models/userSchema');
// const redisClient = require('../config/redis');

// const userMiddleware = async (req, res, next) => {
//     try {
//         const { token } = req.cookies;

//         if (!token) {
//             return res.status(401).send("Token is not provided");
//         }

//         const payload = jwt.verify(token, "secretkey"); // ✅ use env secret

//         const userId = payload._id || payload.id; // ✅ support both _id and GitHub id

//         if (!userId) {
//             return res.status(401).send("Unauthorized: Invalid token payload");
//         }

//         const finduser = await User.findOne({
//             $or: [{ _id: userId }, { githubId: userId }]
//         });

//         if (!finduser) {
//             return res.status(404).send("User not found");
//         }

//         // const IsBlocked = await redisClient.exists(`blocked:${token}`);
//         const IsBlocked = await redisClient.exists(`blocked:${token}`);

//         if (IsBlocked) {
//             console.log("User is blocked token:", token);
//             return res.status(403).send("Forbidden: User is blocked");
//         }

//         req.finduser = finduser;
//         next();
//     } catch (err) {
//         res.status(500).send("Error: " + err.message);
//     }
// };

// module.exports = userMiddleware;


const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const redisClient = require('../config/redis');

const userMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ error: "Token not provided" });

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({
            $or: [{ _id: payload._id }, { githubId: payload.githubId }]
        });

        if (!user) return res.status(404).json({ error: "User not found" });

        // ✅ Check blacklisting via user._id (not full token)
        const isBlocked = await redisClient.exists(`blocked:${payload._id}`);
        if (isBlocked) return res.status(403).json({ error: "Token is blocked" });

        req.finduser = user;
        next();
    } catch (err) {
        console.error("Auth Middleware Error:", err.message); // ✅ Better logs
        return res.status(500).json({ error: "Auth middleware failed" });
    }
};

module.exports = userMiddleware;
