const { emailActionsEnum } = require('../configs');

module.exports = {
    [emailActionsEnum.CHANGE_USER_PASSWORD]: {
        templateName: 'change_user_password',
        subject: 'Change password to your account'
    },

    [emailActionsEnum.DELETED_USER]: {
        templateName: 'deleted_user',
        subject: 'Deleting an account on our site'
    },

    [emailActionsEnum.DELETED_UNACTIVATED_ACCOUNT]: {
        templateName: 'deleted_unactivated_account',
        subject: 'Deleting an account on our site'
    },

    [emailActionsEnum.NEW_USER_PASSWORD]: {
        templateName: 'new_user_password',
        subject: 'You have just changed password to your account'
    },

    [emailActionsEnum.REGISTERED_USER]: {
        templateName: 'registered_user',
        subject: 'Registering on our site'
    },

    [emailActionsEnum.REMIND_ACTIVATE_ACCOUNT]: {
        templateName: 'remind_activate_account',
        subject: 'Activate your account'
    },

    [emailActionsEnum.REMIND_PUBLICATIONS]: {
        templateName: 'remind_post_publications',
        subject: 'Your publications'
    },

    [emailActionsEnum.UPDATED_USER]: {
        templateName: 'updated_user',
        subject: 'Updating our account'
    }
};
