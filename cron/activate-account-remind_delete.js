const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const { DELETED_UNACTIVATED_ACCOUNT, REMIND_ACTIVATE_ACCOUNT } = require('../configs');
const { User } = require('../dataBase');
const { sendRemindingMails } = require('../util');

dayJs.extend(utc);

module.exports = async () => {
    const createdThreeDaysAgo = dayJs.utc().subtract(3, 'day');
    const createdSevenDaysAgo = dayJs.utc().subtract(7, 'day');

    const usersToRemind = await User.find({
        is_active: false, $and: [
            {createdAt: {$lt: createdThreeDaysAgo}},
            {createdAt: {$gt: createdSevenDaysAgo}}
        ]
    }).exec();

    const usersDelete = await User.find({ is_active: false, createdAt: { $lt: createdSevenDaysAgo }}).exec();

    if (usersToRemind.length) {
        sendRemindingMails(usersToRemind, REMIND_ACTIVATE_ACCOUNT);
    }

    if (usersDelete.length) {
        sendRemindingMails(usersDelete, DELETED_UNACTIVATED_ACCOUNT);
    }

    await User.deleteMany({ is_active: false, createdAt: { $lt: createdSevenDaysAgo }});

};
