const express = require('express');
const User = require('../models/userSchema')
const { register, login, logout, adminregister, deletedprofil, alluser, updateUserStatus, getUserStats, adminDeleteUser } = require('../controllers/userAuthent.js');
const userMiddleware = require('../middleware/userMiddleware.js');
const adminMiddleware = require('../middleware/adminMiddleware.js');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const authRoutre = express.Router()

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;

authRoutre.get('/github', (req, res) => {
    const redirectURL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user`;
    res.redirect(redirectURL);
});

// 2. Handle GitHub callback
authRoutre.get('/github/callback', async (req, res) => {
    const code = req.query.code;
    try {
        // Exchange code for access token
        const tokenRes = await axios.post(`https://github.com/login/oauth/access_token`, {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
        }, {
            headers: { Accept: 'application/json' },
        });

        const access_token = tokenRes.data.access_token;

        // Get user info
        const userRes = await axios.get('https://api.github.com/user', {
            headers: { Authorization: `token ${access_token}` },
        });

        const githubUser = userRes.data;

        // Create a JWT (or session) — customize payload as needed
        const token = jwt.sign({
            id: githubUser.id,
            username: githubUser.login,
            avatar: githubUser.avatar_url,
        }, "secretkey", { expiresIn: '7d' });

        // Send token to frontend via redirect with query
        res.redirect(`${FRONTEND_URL}/auth-success?token=${token}`);
    } catch (error) {
        console.error("GitHub login error:", error);
        res.redirect(`${FRONTEND_URL}/auth-failure`);
    }
});

authRoutre.post('/register', register)
authRoutre.post('/login', login);
authRoutre.post('/logout', userMiddleware, logout);
authRoutre.post('/admin/register', adminMiddleware, adminregister);
authRoutre.get('/alluser', userMiddleware, alluser)

authRoutre.patch('/user/:userId/status', adminMiddleware, updateUserStatus);
authRoutre.get('/stats', adminMiddleware, getUserStats);
// User self-deletion
authRoutre.delete('/profile', userMiddleware, deletedprofil);

// Admin deletion of any user
authRoutre.delete('/admin/users/:userId', adminMiddleware, adminDeleteUser);

authRoutre.get("/check", userMiddleware, (req, res) => {


    const reply = {
        name: req.finduser.name,
        email: req.finduser.email,
        _id: req.finduser._id,
        role: req.finduser.role,
        isPaidUser: req.finduser.isPaidUser,
        problemSolved: req.finduser.problemSolved,
        createdAt: req.finduser.createdAt,
        country: req.finduser.country,
        avatar: req.finduser.avatar,
        streak: req.finduser.streak, // Uncomment if streak exists in your schema
    };


    res.status(200).json({
        message: "valid user",
        user: reply
    })
})






// Update user role
authRoutre.patch('/admin/users/:userId/role', adminMiddleware, async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { role },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User role updated successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating user role",
            error: error.message
        });
    }
});

// Update subscription status
authRoutre.patch('/admin/users/:userId/subscription', adminMiddleware, async (req, res) => {
    try {
        const { userId } = req.params;
        const { isPaidUser } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { isPaidUser },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User subscription updated successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating user subscription",
            error: error.message
        });
    }
});

authRoutre.patch('/profile', userMiddleware, async (req, res) => {
    // We only allow specific fields to be updated via this endpoint
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'country', 'avatar', 'email']; // Define what the user is allowed to change
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {

        const user = req.finduser;

        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();


        res.status(200).json({
            _id: user._id,
            name: user.name,
            avatar: user.avatar,
            email: user.email,
            country: user.country,
        });

    } catch (error) {
        console.error(error);

        res.status(400).send({ error: error.message });
    }
});



module.exports = authRoutre;