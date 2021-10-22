const authRouter = require('express').Router();

const { actionTokenTypes } = require('../configs');
const { authController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');
const { updateUserPasswordValidator } = require('../validators');

authRouter.post('/',
    authMiddleware.isLoginBodyValid,
    authMiddleware.loginUserMiddleware,
    authController.loginUser);

authRouter.post('/activate',
    authMiddleware.checkActionToken(actionTokenTypes.ACTIVATE_ACCOUNT),
    authController.activateUser);

authRouter.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logoutUser);

authRouter.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.loginUser);

authRouter.post('/password/forgot',
    userMiddleware.checkUserExistMiddleware,
    authController.sendMailChangePassword);

authRouter.post('/password/set/:token',
    userMiddleware.userValidationMiddleware(updateUserPasswordValidator),
    authMiddleware.checkActionToken(actionTokenTypes.FORGOT_PASSWORD),
    authController.setNewPassword);

module.exports = authRouter;
