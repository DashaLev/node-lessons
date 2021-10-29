const { PHOTOS_MIMETYPES, PHOTO_MAX_SIZE } = require('../configs');
const { ErrorHandler, NOT_SUPPORTED_FORMAT, FILE_TOO_BIG} = require('../errors');

module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            const { avatar } = req.files;

            if (!avatar) {
                next();
                return;
            }

            const { size, mimetype } = avatar;

            if (!PHOTOS_MIMETYPES.includes(mimetype)) {
                throw new ErrorHandler(NOT_SUPPORTED_FORMAT.message, NOT_SUPPORTED_FORMAT.status);
            }

            if (size > PHOTO_MAX_SIZE) {
                throw new ErrorHandler(FILE_TOO_BIG.message, FILE_TOO_BIG.status);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
