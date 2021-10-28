const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const { REMIND_LOGIN } = require('../configs');
const { O_Auth } = require('../dataBase');
const { sendRemindingMails } = require('../util');

dayJs.extend(utc);

module.exports = async () => {
    const createdTenDaysAgo = dayJs.utc().subtract(10, 'days');

    const usersToRemind = await O_Auth
        .find({ createdAt: { $lt: createdTenDaysAgo } })
        .populate('user_id');

    if (usersToRemind.length) {
        const users = [];

        usersToRemind.forEach(user => users.push(user.user_id));

        sendRemindingMails(users, REMIND_LOGIN);
    }
};
