const User = require('../models/userSchema')
const bcrypt = require('bcrypt');
const validateuser = require('../utils/validators');
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');



const register = async (req, res) => {
    try {
        console.log("Registering user with data:", req.body);
        validateuser(req.body);

        const { name, email, password } = req.body;

        // Check if a user with the given email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: "An account with this email already exists."
            });
        }

        // This is a standard registration flow.
        // GitHub registration is handled entirely by the Passport strategy.
        if (!password) {
            return res.status(400).json({
                success: false,
                error: "Password is required for registration."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user'
        });

        // Create token and cookie
        const token = jwt.sign(
            { _id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET || "secretkey", // Use env variable for secret
            { expiresIn: '14d' }
        );

        res.cookie('token', token, {
            maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None'
        });

        res.status(201).json({ // Use 201 for resource creation
            user: {
                name: user.name,
                email: user.email,
                _id: user._id,
                role: user.role,
                avatar: user.avatar
            },
            message: "Registration successful"
        });

    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({
            success: false,
            error: "Registration failed due to a server error.",
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "Email and password are required",
                field: !email ? "email" : "password"
            });
        }

        const user = await User.findOne({ email });

        // Check user exists before comparing passwords
        if (!user) {
            return res.status(401).json({
                success: false,
                error: "No account found with this email",
                field: "email"
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                success: false,
                error: "Incorrect password",
                field: "password"
            });
        }

        const token = jwt.sign(
            { email: email, _id: user._id, role: user.role },
            "secretkey",
            { expiresIn: 1200 * 1200 }
        );

        const reply = {
            name: user.name,
            email: user.email,
            _id: user._id,
            role: user.role,
            isPaidUser: user.isPaidUser,
            problemSolved: user.problemSolved,
            createdAt: user.createdAt,
            streak: user.streak,

        }

        res.cookie('token', token, {
            maxAge: 1200 * 1200 * 1000,
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            secure: true,            // REQUIRED for cross-origin in HTTPS
            sameSite: 'None'

        });

        res.status(200).json({
            success: true,
            user: reply,
            message: "Login successful"
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({
            success: false,
            error: "An unexpected error occurred during login",
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};



const alluser = async (req, res) => {
    try {
        const alluser = await User.find()
        if (alluser.length === 0) {
            return res.status(404).send("No User found");
        }
        res.status(200).json({ message: "All User fetched successfully", alluser });
    } catch (error) {
        res.send("Error in fetch: " + err)


    }
}


const logout = async (req, res) => {

    try {
        //validate tocken
        const { token } = req.cookies;
        const payload = jwt.decode(token);
        // console.log("Payload:", payload);

        await redisClient.set(`blocked:${token}`, 'blocked');
        await redisClient.expireAt(`blocked:${token}`, payload.exp); // Set expiration same as token expiration
        // res.clearCookie('token'); // Clear the cookie

        res.cookie('token', null, { expires: new Date(Date.now()) }); // Clear the cookie {maxAge:0, httpOnly:true}   
        res.status(200).json("Logout Successful");

    }
    catch (err) {
        res.status(500).send("Error: " + err.message);
    }
}

const adminregister = async (req, res) => {
    try {

        validateuser(req.body);

        const { email, password } = req.body;
        req.body.password = await bcrypt.hash(password, 10);

        const user = await User.create(req.body);
        const token = jwt.sign({ email: email, _id: user._id, role: user.role }, "secretkey", { expiresIn: 120 * 120 }); // 1 hour expiration
        res.cookie('token', token, { maxAge: 120 * 120 * 1000, httpOnly: true }); // Set cookie with token
        res.send("Admin User Created Successfully");
    }
    catch (err) {
        res.status(500).send("Error: " + err.message);
    }
}

const deletedprofil = async (req, res) => {

    const userId = req.finduser._id;

    try {
        const deluser = await User.findByIdAndDelete(userId);
        // deleat the solutions of the user 
        // await Solution.deleteMany({userId});

        // another way to delete all solutions of the user
        if (!deluser) {
            return res.status(404).send("User not found");
        }
        res.status(200).send("User deleted successfully+ and all data related to user deleted");
    }
    catch (err) {
        res.status(500).send("Error: " + err)
    }
}

// In your userAuthent.js
const adminDeleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const deluser = await User.findByIdAndDelete(userId);
        if (!deluser) {
            return res.status(404).send("User not found");
        }
        res.status(200).send("User deleted successfully and all related data deleted");
    } catch (err) {
        res.status(500).send("Error: " + err);
    }
};

// Update user status (e.g., isPaidUser)
const updateUserStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const { isPaidUser } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { isPaidUser },
            { new: true }
        );

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.status(200).json({ message: "User status updated", user });
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
};

const getUserStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const paidUsers = await User.countDocuments({ isPaidUser: true });
        const activeUsers = await User.countDocuments({
            problemSolved: { $exists: true, $not: { $size: 0 } }
        });
        const admins = await User.countDocuments({ role: 'admin' });

        res.status(200).json({
            totalUsers,
            paidUsers,
            activeUsers,
            admins
        });
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
};


module.exports = {
    register,
    login,
    logout,
    adminregister,
    deletedprofil,
    alluser,
    updateUserStatus,
    getUserStats,
    adminDeleteUser

}





