const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const redisClient = require('../config/redis');

const adminMiddleware = async (req, res, next) => {

    try {
        const token = req.headers["authorization"]?.split(" ")[1] || req.cookies?.token || null;
        //  console.log("Token received:", token);
        if (!token) {
            return res.status(401).send("Token is not provided")
        }

        const payload = jwt.verify(token, "secretkey")

        const { _id, role } = payload;
        if (!_id || role !== 'admin') {
            return res.status(403).send("Forbidden: You do not have admin access")
        }

        const finduser = await User.findById(_id);
        if (!finduser) {
            return res.status(404).send("User not found");
        }
        // Redis ke blockList mein persent toh nahi hai

        const IsBlocked = await redisClient.exists(`blocked:${token}`);


        if (IsBlocked)
            throw new Error("Invalid Token");

        req.finduser = finduser;
        next();

    }
    catch (err) {
        return res.status(500).send("Error in adminMiddleware: " + err.message);
    }
}


module.exports = adminMiddleware;