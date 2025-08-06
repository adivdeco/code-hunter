const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/userSchema');

// Serialize/Deserialize user
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "https://code-hunter-backend.onrender.com/auth/github/callback",
    scope: ['user:email']
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Find user by GitHub ID or email
            let user = await User.findOne({
                $or: [
                    { githubId: profile.id },
                    { email: profile.emails[0].value }
                ]
            });

            if (!user) {
                // Create new user
                user = await User.create({
                    name: profile.displayName || profile.username,
                    email: profile.emails[0].value,
                    githubId: profile.id,
                    avatar: profile.photos[0]?.value || '',
                    role: 'user',
                    password: '' // No password for GitHub users
                });
            } else if (!user.githubId) {
                // Link GitHub to existing account
                user.githubId = profile.id;
                await user.save();
            }

            done(null, user);
        } catch (err) {
            done(err);
        }
    }
));

module.exports = passport;