const cron = require('node-cron');

const remindActivateAccountOrDelete = require('./activate-account-remind_delete');
const remindLogin = require('./login-account-remind');
const removeOldTokens = require('./old-tokens-remove.job');
const remindPublications = require('./publications-remind');

module.exports = () => {
    cron.schedule('*/8 * * * * *', () => { // 00 10 * * 1,4 At 10:00 on Mondays and Thursdays
        remindLogin();
    });

    cron.schedule('0 10 * * 1', () => { // At 10:00 on Mondays
        remindActivateAccountOrDelete();
    });

    cron.schedule('0 10 */13 * *', () => { // At 10:00 on every 13th day-of-month
        remindPublications();
    });

    cron.schedule('5 0 1 * *', () => { // At 00:05 on day-of-month 1
        removeOldTokens();
    });
};
