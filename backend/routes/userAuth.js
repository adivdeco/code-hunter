const express = require('express');

const { register, login, logout, adminregister, deletedprofil, alluser, updateUserStatus, getUserStats, adminDeleteUser } = require('../controllers/userAuthent.js');
const userMiddleware = require('../middleware/userMiddleware.js');
const adminMiddleware = require('../middleware/adminMiddleware.js');

const authRoutre = express.Router()

authRoutre.post('/register', register)
authRoutre.post('/login', login);
authRoutre.post('/logout', userMiddleware, logout);
authRoutre.post('/admin/register', adminMiddleware, adminregister);
authRoutre.get('/alluser', adminMiddleware, alluser)

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
        role: req.finduser.role
    }
    // console.log("hello");

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
            return res.status(400).send("Invalid role");
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { role },
            { new: true }
        );

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.status(200).json({ message: "User role updated", user });
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
});

// Update subscription status
// authRoutre.patch('/admin/users/:userId/subscription', adminMiddleware, async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { isPaidUser } = req.body;

//         const user = await User.findByIdAndUpdate(
//             userId,
//             { isPaidUser },
//             { new: true }
//         );

//         if (!user) {
//             return res.status(404).send("User not found");
//         }

//         res.status(200).json({ message: "User subscription updated", user });
//     } catch (error) {
//         res.status(500).send("Error: " + error.message);
//     }
// });

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



module.exports = authRoutre;