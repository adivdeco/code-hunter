const express = require('express');
const User = require('../models/userSchema')
const { register, login, logout, adminregister, deletedprofil, alluser, updateUserStatus, getUserStats, adminDeleteUser } = require('../controllers/userAuthent.js');
const userMiddleware = require('../middleware/userMiddleware.js');
const adminMiddleware = require('../middleware/adminMiddleware.js');
const passport = require('passport');

const authRoutre = express.Router()

authRoutre.post('/register', register)
authRoutre.post('/login', login);


authRoutre.get('/github', passport.authenticate('github', { session: false })); authRoutre.get('/github/callback', (req, res) => {
    passport.authenticate('github', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=github_auth_failed`);
        }

        // Create JWT token
        const token = jwt.sign(
            { email: user.email, _id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Set cookie and redirect
        res.cookie('token', token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None'
        });

        res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
    })(req, res, next);
});


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