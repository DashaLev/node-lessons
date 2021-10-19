const { emailActionsEnum } = require('../configs');

module.exports = {
    [emailActionsEnum.DELETED_USER]: {
        templateName: 'deleted_user',
        subject: 'Deleting an account on our site'
    },

    [emailActionsEnum.REGISTERED_USER]: {
        templateName: 'registered_user',
        subject: 'Registering on our site'
    },

    [emailActionsEnum.UPDATED_USER]: {
        templateName: 'updated_user',
        subject: 'Updating our account'
    }
};
