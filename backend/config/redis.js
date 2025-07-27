
const { createClient } = require('redis');

const redisClient = createClient({
    username: 'default',
    password: 'uCdfsRVkf8g8htrOGtIiHOCiGUSmkyZK',
    socket: {
        host: 'redis-16054.crce179.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 16054
    }
});
redisClient.on('error', (err) => {
    console.error("❌ Redis connection error:", err);
});

module.exports = redisClient

//  redis-cli -u redis://default:uCdfsRVkf8g8htrOGtIiHOCiGUSmkyZK
//  @redis-16054.crce179.ap-south-1-1.ec2.redns.redis-cloud.com:16054