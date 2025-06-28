
const  { createClient } = require('redis');

const redisClint = createClient({
    username: 'default',
    password: 'uCdfsRVkf8g8htrOGtIiHOCiGUSmkyZK',
    socket: {
        host: 'redis-16054.crce179.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 16054
    }
});

module.exports = redisClint

