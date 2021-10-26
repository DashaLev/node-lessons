const authRouter = require('express').Router();

const { actionTokenTypes } = require('../configs');
const { authController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');
const { loginUserValidator, userPasswordValidator, userEmailValidator} = require('../validators');

authRouter.post('/',
    userMiddleware.validationMiddleware(loginUserValidator),
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
    userMiddleware.validationMiddleware(userEmailValidator),
    userMiddleware.checkUserExistByEmail,
    authController.sendMailChangePassword);

authRouter.put('/password/forgot',
    userMiddleware.validationMiddleware(userPasswordValidator),
    authMiddleware.checkActionToken(actionTokenTypes.FORGOT_PASSWORD),
    authController.setNewPassword);

module.exports = authRouter;
