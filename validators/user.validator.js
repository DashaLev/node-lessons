const joi = require('joi');

const { EMAIL_REGEXP, PASSWORD_REGEXP, userRoles} = require('../configs');

const createUserValidator = joi.object({
    name: joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    email: joi
        .string()
        .regex(EMAIL_REGEXP)
        .required(),
    role: joi
        .string()
        .allow(...Object.values(userRoles)),
    password:joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required()
});

const updateUserValidator = joi.object({
    name: joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required()
});

module.exports = {
    createUserValidator,
    updateUserValidator
};

