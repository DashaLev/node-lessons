module.exports = {
    WRONG_EMAIL_OR_PASSWORD: {
        message: 'Wrong email or password',
        status: 400
    },
    NOT_SUPPORTED_FORMAT: {
        message: 'Not supported format',
        status: 400
    },

    FILE_TOO_BIG: {
        message: 'File is too big',
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
    },

    EMAIL_ALREADY_EXISTS: {
        message: 'Email already exists',
        status: 409
    },

    WRONG_TOKEN_TYPE: {
        message: 'Wrong token type',
        status: 500
    }
};

