
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const redisClint = require('../config/redis'); 


const userMiddleware =async (req, res, next) => {

    try{
        
        const {token} = req.cookies;

        if (!token) {
            return res.status(401).send("tocken is not provided");
        }


       const payload  =  jwt.verify(token,"secreatkey")
       

        const {_id} = payload; 
        if (!_id) {
            return res.status(401).send("Unauthorized: Invalid token payload");
        }

        const finduser = await User.findById(_id); 
        if (!finduser) {
            return res.status(404).send("User not found");
        }

        const IsBlocked = await redisClint.exists(`blocked:${token}`); // Check if user is blocked in Redis
        if (IsBlocked) {
            return res.status(403).send("Forbidden: User is blocked");
        }
        req.finduser = finduser; // Attach the found user to the response object
        next(); 


    }
    catch(err) {
        res.status(500).send("Error: " + err.message);
    }
}

module.exports = userMiddleware;

// paylod walla ka part hai(err, decoded) => {
//     if (err) return res.status(401).send("Error: invalid signature");
//     req.finduser = decoded;
//     next();
//   })