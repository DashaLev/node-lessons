const { MONGO_CONNECT_URL, PORT, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require('./config');
const { PASSWORD_REGEXP, EMAIL_REGEXP, DEFAULT_STATUS_ERR, AUTHORIZATION } = require('./constants');
const { O_AUTH_MODEL, POST_MODEL, USER_MODEL } = require('./model-name.enum');
const { ACCESS, REFRESH } = require('./token-type.enum');
const userRoles = require('./user-roles.enum');


module.exports = {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    MONGO_CONNECT_URL,
    PORT,

    AUTHORIZATION,
    EMAIL_REGEXP,
    DEFAULT_STATUS_ERR,
    PASSWORD_REGEXP,

    userRoles,

    ACCESS,
    REFRESH,

    O_AUTH_MODEL,
    POST_MODEL,
    USER_MODEL
};
