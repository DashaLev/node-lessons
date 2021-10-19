const { emailActionsEnum } = require('../configs');

module.exports = {
    [emailActionsEnum.REGISTERED_USER]: {
        templateName: 'registered_user',
        subject: 'Registering on our site'
    },

    [emailActionsEnum.DELETED_USER]: {
        templateName: 'deleted_user',
        subject: 'Deleting an account on our site'
    }
};
