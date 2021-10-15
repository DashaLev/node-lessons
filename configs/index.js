const { MONGO_CONNECT_URL, PORT } = require('./config');
const { PASSWORD_REGEXP, EMAIL_REGEXP, DEFAULT_STATUS_ERR } = require('./constants');
const userRoles = require('./user-roles.enum');

module.exports = {
    MONGO_CONNECT_URL,
    PORT,

    PASSWORD_REGEXP,
    EMAIL_REGEXP,
    DEFAULT_STATUS_ERR,

    userRoles
};
