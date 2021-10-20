const { MONGO_CONNECT_URL, PORT, JWT_ACTION_SECRET, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET,
    TRANSPORTER_SENDER_EMAIL, TRANSPORTER_SENDER_PASS } = require('./config');
const { PASSWORD_REGEXP, EMAIL_REGEXP, AUTHORIZATION } = require('./constants');
const { CHANGE_USER_PASSWORD, DELETED_USER, REGISTERED_USER, NEW_USER_PASSWORD, UPDATED_USER } = require('./email-actions.enum');
const { ACTION_MODEL, O_AUTH_MODEL, POST_MODEL, USER_MODEL } = require('./model-names.enum');
const { ACTION_FORGOT_PASSWORD, ACCESS, REFRESH } = require('./token-types.enum');

module.exports = {
    emailActionsEnum: require('./email-actions.enum'),
    actionTypes: require('./token-types.enum'),
    userRoles: require('./user-roles.enum'),

    JWT_ACTION_SECRET,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,

    MONGO_CONNECT_URL,
    PORT,

    TRANSPORTER_SENDER_EMAIL,
    TRANSPORTER_SENDER_PASS,

    AUTHORIZATION,
    EMAIL_REGEXP,
    PASSWORD_REGEXP,

    ACTION_FORGOT_PASSWORD,
    ACCESS,
    REFRESH,

    ACTION_MODEL,
    O_AUTH_MODEL,
    POST_MODEL,
    USER_MODEL,

    CHANGE_USER_PASSWORD,
    DELETED_USER,
    REGISTERED_USER,
    NEW_USER_PASSWORD,
    UPDATED_USER
};
