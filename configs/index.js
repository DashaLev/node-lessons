const { MONGO_CONNECT_URL, PORT, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET,
    TRANSPORTER_SENDER_EMAIL, TRANSPORTER_SENDER_PASS } = require('./config');
const { PASSWORD_REGEXP, EMAIL_REGEXP, AUTHORIZATION } = require('./constants');
const { REGISTERED_USER, DELETED_USER } = require('./email-actions.enum');
const { O_AUTH_MODEL, POST_MODEL, USER_MODEL } = require('./model-names.enum');
const { ACCESS, REFRESH } = require('./token-types.enum');

module.exports = {
    emailActionsEnum: require('./email-actions.enum'),
    userRoles: require('./user-roles.enum'),

    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,

    MONGO_CONNECT_URL,
    PORT,

    TRANSPORTER_SENDER_EMAIL,
    TRANSPORTER_SENDER_PASS,

    AUTHORIZATION,
    EMAIL_REGEXP,
    PASSWORD_REGEXP,

    ACCESS,
    REFRESH,

    O_AUTH_MODEL,
    POST_MODEL,
    USER_MODEL,

    REGISTERED_USER,
    DELETED_USER
};
