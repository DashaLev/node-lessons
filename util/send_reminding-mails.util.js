const { emailService } = require('../services');

module.exports = async (arr, emailTemplate) => {
    for (const user of arr) {
        await emailService.sendMail(user.email, emailTemplate, { userName: user.name });
    }
};
