
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const redisClient = require('../config/redis');


const userMiddleware = async (req, res, next) => {

    try {
        // Check session authentication first
        if (req.isAuthenticated()) {
            req.finduser = req.user;
            return next();
        }

        const { token } = req.cookies;

        if (!token) {
            return res.status(401).send("tocken is not provided");
        }


        const payload = jwt.verify(token, "secretkey")


        const { _id } = payload;
        if (!_id) {
            return res.status(401).send("Unauthorized: Invalid token payload");
        }


        // find user
        const finduser = await User.findById(_id);
        if (!finduser) {
            return res.status(404).send("User not found");
        }

        const IsBlocked = await redisClient.exists(`blocked:${token}`);

        if (IsBlocked) {
            return res.status(403).send("Forbidden: User is blocked");
        }
        req.finduser = finduser; // Attach the found user to the response object
        next();


    }
    catch (err) {
        res.status(500).send("Error: " + err.message);
    }
}

module.exports = userMiddleware;





// const register = async (req, res) => {
//     try {
//         console.log(req.body);
//         validateuser(req.body);

//         const { name, email, password } = req.body;


//         // For GitHub OAuth users (no password)
//         if (req.user && req.user.githubId) {
//             return res.status(200).json({
//                 success: true,
//                 user: req.user
//             });
//         }

//         req.body.password = await bcrypt.hash(password, 10);

//         req.body.role = 'user';

//         const user = await User.create(req.body);   // add data to database


//         const token = jwt.sign({ _id: user._id, email: email, role: 'user' }, "secretkey", { expiresIn: 1200 * 1200 }); // 1 hour expiration


//         const reply = {
//             name: user.name,
//             email: user.email,
//             _id: user._id,
//             role: user.role,
//         }

//         res.cookie('token', token, { maxAge: 1200 * 1200 * 1000, httpOnly: true }); // Set cookie with token
//         res.status(200).json({
//             user: reply,
//             message: "login sussesfully",
//         });
//     }
//     catch (err) {
//         res.send("Error: " + err)
//     }
// }