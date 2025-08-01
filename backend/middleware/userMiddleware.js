
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




const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const redisClient = require('../config/redis');

const userMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).send("Token is not provided");
        }

        const payload = jwt.verify(token, "secretkey"); // ✅ use env secret

        const userId = payload._id || payload.id; // ✅ support both _id and GitHub id

        if (!userId) {
            return res.status(401).send("Unauthorized: Invalid token payload");
        }

        const finduser = await User.findOne({
            $or: [{ _id: userId }, { githubId: userId }]
        });

        if (!finduser) {
            return res.status(404).send("User not found");
        }

        const IsBlocked = await redisClient.exists(`blocked:${token}`);
        if (IsBlocked) {
            return res.status(403).send("Forbidden: User is blocked");
        }

        req.finduser = finduser;
        next();
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
};

module.exports = userMiddleware;
