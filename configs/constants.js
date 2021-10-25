module.exports = {
    AUTHORIZATION: 'Authorization',

    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/),

    CREATED_STATUS: 201,
    NO_CONTENT_STATUS: 204,
    BAD_REQUEST_STATUS: 400,
    DEFAULT_STATUS_ERR: 500,
    CORS_NOT_ALLOWED: 'CORS is not allowed',
    WRONG_TEMPLATE_NAME: 'Wrong template name'
};
