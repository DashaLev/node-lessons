module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',

    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/my-db',
    PORT: process.env.PORT || 5000,
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN,

    FRONT_END_URL: process.env.FRONT_END_URL,
    FORGOT_PASSWORD_FRONT_END_URL: process.env.FORGOT_PASSWORD_FRONT_END_URL,
    ACTIVATE_ACCOUNT_FRONT_END_URL: process.env.ACTIVATE_ACCOUNT_FRONT_END_URL,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'otorhinolaryngological',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'pneumoencephalographically',
    JWT_FORGOT_PASSWORD_SECRET: process.env.JWT_FORGOT_PASSWORD_SECRET || 'otorhinolaryngologicalpneumoencepally',
    JWT_ACTIVATE_ACCOUNT_SECRET: process.env.JWT_ACTIVATE_ACCOUNT_SECRET || 'ccalpneumoencephalograph',

    TRANSPORTER_SENDER_EMAIL: process.env.TRANSPORTER_SENDER_EMAIL,
    TRANSPORTER_SENDER_PASS: process.env.TRANSPORTER_SENDER_PASS,

    DEFAULT_ADMIN_PASSWORD: process.env.DEFAULT_ADMIN_PASSWORD,

    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_NAME: process.env.AWS_S3_NAME,
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY
};
