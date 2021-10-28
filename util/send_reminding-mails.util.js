const { emailService: { sendMail } } = require('../services');

module.exports = async (arr, emailTemplate) => {
    await Promise.allSettled([arr.forEach(user => {
        sendMail(user.email, emailTemplate, { userName: user.name });
    })]);
};
