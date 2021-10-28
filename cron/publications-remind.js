const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const { REMIND_PUBLICATIONS } = require('../configs');
const { Post } = require('../dataBase');
const { sendRemindingMails } = require('../util');

dayJs.extend(utc);

module.exports = async () => {
    const createdTenDaysAgo = dayJs.utc().subtract(10, 'day');

    const usersToRemind = await Post
        .find({createdAt: {$lt: createdTenDaysAgo } })
        .populate('user_id')
        .exec();

    if (usersToRemind.length) {
        const users = [];

        usersToRemind.forEach(user => users.push(user.user_id));

        sendRemindingMails(users, REMIND_PUBLICATIONS);
    }
};
