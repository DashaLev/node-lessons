module.exports = {
    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/my-db',
    PORT: process.env.PORT || 5000,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'otorhinolaryngological',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'pneumoencephalographically',

    TRANSPORTER_SENDER_EMAIL: process.env.TRANSPORTER_SENDER_EMAIL,
    TRANSPORTER_SENDER_PASS: process.env.TRANSPORTER_SENDER_PASS
};
