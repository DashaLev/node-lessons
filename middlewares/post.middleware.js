const { postValidator } = require('../validators');

module.exports = {
    isPostBodyValid: (req, res, next) => {
        try {
            const { error, value } = postValidator.createPostValidator.validate(req.body);

            if (error) {
                return next({
                    message: error.details[0].message
                });
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
};
