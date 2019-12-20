module.exports = {
    jwtsecrets: process.env.JWT_SECRET || 'VideoGamesAreAwesome',
    environment: process.env.NODE_ENV || 'development',
};