module.exports = {
    EMAIL_ALREADY_EXISTS: {
        message: 'Email already exists',
        status: 400
    },

    UPDATE_UNALLOWED_USER_FIELDS: {
        message: 'You can update only field - Name',
        status: 400
    },

    UPDATE_UNALLOWED_POST_FIELDS: {
        message: 'You can update only field - Title and Post_body',
        status: 400
    },

    WRONG_EMAIL_OR_PASSWORD: {
        message: 'Wrong email or password',
        status: 400
    },

    INVALID_TOKEN: {
        message: 'Invalid token',
        status: 401
    },

    ACCESS_DENIED: {
        message: 'Access denied',
        status: 403
    },

    ENTITY_NOT_FOUND: {
        message: 'Entity  not found',
        status: 404
    }
};

