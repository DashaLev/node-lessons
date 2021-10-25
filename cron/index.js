const cron = require('node-cron');

const remindActivateAccount = require('./activate-account-remind');
const removeOldTokens = require('./old-tokens-remove.job');

module.exports = () => {
    cron.schedule('5 0 1 * *', () => { // At 00:05 on day-of-month 1
        removeOldTokens();
    });

    cron.schedule('0 10 * * 1', () => { // At 10:00 on Mondays
        remindActivateAccount();
    });
};
