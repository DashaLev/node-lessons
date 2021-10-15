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

    ACCESS_DENIED: {
        message: 'Access denied',
        status: 403
    },

    POST_NOT_FOUND: {
        message: 'Post not found',
        status: 404
    },

    USER_NOT_FOUND: {
        message: 'User not found',
        status: 404
    },

    WRONG_EMAIL_OR_PASSWORD: {
        message: 'Wrong email or password',
        status: 404
    }
};
