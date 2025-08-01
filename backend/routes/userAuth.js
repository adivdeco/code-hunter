const express = require('express');
const User = require('../models/userSchema')
const { register, login, logout, adminregister, deletedprofil, alluser, updateUserStatus, getUserStats, adminDeleteUser } = require('../controllers/userAuthent.js');
const userMiddleware = require('../middleware/userMiddleware.js');
const adminMiddleware = require('../middleware/adminMiddleware.js');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
// const jwt = require('jsonwebtoken');


const authRoutre = express.Router()

authRoutre.post('/register', register)
authRoutre.post('/login', login);


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // Use the BACKEND_URL from .env to make it flexible for dev and prod
    callbackURL: "https://code-hunter-backend.onrender.com/auth/github/callback",
    scope: ['user:email'], // Request email scope
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log('GitHub Profile received:', profile);

            const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

            // If GitHub doesn't provide a public email, the flow can't continue.
            if (!email) {
                return done(new Error('GitHub account does not have a public email address. Please add a public email to your GitHub profile.'), null);
            }

            // Find a user by their GitHub ID OR their email
            let user = await User.findOne({
                $or: [{ githubId: profile.id }, { email: email }]
            });

            if (user) {
                // If user exists but githubId is not set, link the account
                if (!user.githubId) {
                    user.githubId = profile.id;
                    user.avatar = user.avatar || profile.photos[0].value; // Update avatar if not set
                    await user.save();
                }
                return done(null, user); // User found, proceed to log in
            } else {
                // If no user exists, create a new one
                const newUser = await User.create({
                    githubId: profile.id,
                    name: profile.displayName || profile.username,
                    email: email,
                    avatar: profile.photos[0].value,
                    role: 'user'
                    // Password is not required due to schema logic
                });
                return done(null, newUser); // New user created, proceed to log in
            }
        } catch (err) {
            console.error('Error in GitHub passport strategy:', err);
            return done(err); // Pass error to Passport
        }
    }));

// Serialization and Deserialization (no changes needed)
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});


// --- GitHub OAuth Routes ---

authRoutre.get('/github', passport.authenticate('github'));

authRoutre.get('/github/callback',
    passport.authenticate('github', {
        // We use a custom callback, so failureRedirect is handled manually
        session: true
    }),
    (req, res) => {
        // This part runs ONLY on SUCCESSFUL authentication
        // req.user is populated by Passport
        const userData = {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            avatar: req.user.avatar,
            role: req.user.role
            // Add any other user fields the frontend needs
        };

        // This script sends the user data to the parent window and closes the popup
        const script = `
            <script>
                if (window.opener) {
                    window.opener.postMessage({ type: 'auth_success', user: ${JSON.stringify(userData)} }, '${process.env.FRONTEND_URL}');
                    window.close();
                }
            </script>
            <h1>Authentication successful! Please close this window.</h1>
        `;
        res.send(script);
    },
    // Add a dedicated error handler for this route
    (err, req, res, next) => {
        // This part runs on FAILED authentication
        console.error('OAuth Callback Error:', err.message);

        const script = `
            <script>
                if (window.opener) {
                    window.opener.postMessage({ type: 'auth_error', message: 'GitHub authentication failed. ${err.message.replace(/"/g, '\\"')}' }, '${process.env.FRONTEND_URL}');
                    window.close();
                }
            </script>
            <h1>Authentication Failed: ${err.message}. Please close this window.</h1>
        `;
        res.send(script);
    }
);

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






// GitHub OAuth Configuration
// passport.use(new GitHubStrategy({
//     clientID: process.env.GITHUB_CLIENT_ID,
//     clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     callbackURL: "https://code-hunter-backend.onrender.com/auth/github/callback"
// },
//     async (accessToken, refreshToken, profile, done) => {
//         try {
//             // Check if user exists in your database
//             let user = await User.findOne({ githubId: profile.id });

//             if (!user) {
//                 // Create new user if doesn't exist
//                 user = new User({
//                     githubId: profile.id,
//                     name: profile.displayName || profile.username,
//                     email: profile.emails?.[0]?.value || `${profile.username}@github.com`,
//                     avatar: profile.photos?.[0]?.value,
//                     isPaidUser: false, // Default value
//                     role: 'user' // Default role
//                 });
//                 await user.save();
//             }

//             return done(null, user);
//         } catch (err) {
//             return done(err);
//         }
//     }
// ));
// passport.use(new GitHubStrategy({
//     clientID: process.env.GITHUB_CLIENT_ID,
//     clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     callbackURL: "https://code-hunter-backend.onrender.com/auth/github/callback",
//     scope: ['user:email'],
//     state: true,
//     proxy: true // Important for HTTPS
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         console.log('GitHub profile received:', profile);

//         // Find or create user
//         let user = await User.findOne({
//             $or: [
//                 { githubId: profile.id },
//                 { email: profile.emails?.[0]?.value }
//             ]
//         });

//         if (!user) {
//             user = await User.create({
//                 githubId: profile.id,
//                 name: profile.displayName || profile.username,
//                 email: profile.emails?.[0]?.value,
//                 avatar: profile.photos?.[0]?.value,
//                 isPaidUser: false,
//                 role: 'user'
//             });
//         } else if (!user.githubId) {
//             // Merge existing account with GitHub
//             user.githubId = profile.id;
//             await user.save();
//         }

//         return done(null, user);
//     } catch (err) {
//         console.error('GitHub auth error:', err);
//         return done(err);
//     }
// }));

// // Serialization
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         done(null, user);
//     } catch (err) {
//         done(err);
//     }
// });

// // GitHub OAuth Routes
// authRoutre.get('/github', passport.authenticate('github'));

// authRoutre.get('/github/callback',
//     passport.authenticate('github', {
//         failureRedirect: '/auth/failed',
//         session: false // We'll use JWT instead
//     }),
//     (req, res) => {
//         try {
//             if (!req.user) {
//                 throw new Error('User not found after authentication');
//             }

//             // Create JWT token
//             const token = jwt.sign(
//                 {
//                     _id: req.user._id,
//                     email: req.user.email,
//                     role: req.user.role
//                 },
//                 process.env.JWT_SECRET,
//                 { expiresIn: '1h' }
//             );

//             // Send response to frontend
//             const script = `
//         <script>
//           window.opener.postMessage({
//             type: 'auth_success',
//             token: '${token}',
//             user: ${JSON.stringify({
//                 _id: req.user._id,
//                 name: req.user.name,
//                 email: req.user.email,
//                 avatar: req.user.avatar,
//                 role: req.user.role
//             })}
//           }, '${process.env.FRONTEND_URL}');
//           window.close();
//         </script>
//       `;

//             res.send(script);
//         } catch (error) {
//             console.error('Callback error:', error);
//             const script = `
//         <script>
//           window.opener.postMessage({
//             type: 'auth_error',
//             error: 'Authentication failed'
//           }, '${process.env.FRONTEND_URL}');
//           window.close();
//         </script>
//       `;
//             res.send(script);
//         }
//     }
// );

// // Failure route
// authRoutre.get('/auth/failed', (req, res) => {
//     const script = `
//     <script>
//       window.opener.postMessage({
//         type: 'auth_error',
//         error: 'GitHub authentication failed'
//       }, '${process.env.FRONTEND_URL}');
//       window.close();
//     </script>
//   `;
//     res.send(script);
// });


module.exports = authRoutre;