authRoutre.get('/github/callback', async (req, res) => {
    const code = req.query.code;

    try {
        const tokenRes = await axios.post(`https://github.com/login/oauth/access_token`, {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
        }, {
            headers: { Accept: 'application/json' }
        });

        const access_token = tokenRes.data.access_token;

        const userRes = await axios.get('https://api.github.com/user', {
            headers: { Authorization: `token ${access_token}` }
        });

        const githubUser = userRes.data;

        let user = await User.findOne({ githubId: githubUser.id });
        if (!user) {
            user = await User.create({
                githubId: githubUser.id,
                username: githubUser.login,
                avatar: githubUser.avatar_url,
                email: githubUser.email || `${githubUser.id}@github.com`,
                name: githubUser.name || githubUser.login,
                role: 'user'
            });
        }

        const token = jwt.sign({
            githubId: user.githubId,
            _id: user._id,
            username: user.username,
            avatar: user.avatar,
            email: user.email,
            name: user.name,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.redirect(`${FRONTEND_URL}/auth-success?token=${token}`);
    } catch (err) {
        console.error("GitHub Auth Error:", err.message);
        res.redirect(`${FRONTEND_URL}/auth-failure`);
    }
});
