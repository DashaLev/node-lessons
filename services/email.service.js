const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const { TRANSPORTER_SENDER_EMAIL, TRANSPORTER_SENDER_PASS, WRONG_TEMPLATE_NAME } = require('../configs');
const allTemplates = require('../email-templates');
const { ErrorHandler } = require('../errors');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates'),
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: TRANSPORTER_SENDER_EMAIL,
        pass: TRANSPORTER_SENDER_PASS
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {

    const templateInfo = allTemplates[emailAction];

    if (!templateInfo) {
        throw new ErrorHandler(WRONG_TEMPLATE_NAME);
    }

    const html = await templateParser.render(templateInfo.templateName, context);

    return transporter.sendMail({
        from: 'Automatic formed',
        to: userMail,
        subject: templateInfo.subject,
        html
    });
};

module.exports = {
    sendMail
};
