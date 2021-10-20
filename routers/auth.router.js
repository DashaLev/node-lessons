const authRouter = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware, userMiddleware} = require('../middlewares');
const { updateUserPasswordValidator } = require('../validators');

authRouter.post('/',
    authMiddleware.isLoginBodyValid,
    authMiddleware.loginUserMiddleware,
    authController.loginUser);

authRouter.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logoutUser);

authRouter.post('/logout_all_devices',
    authMiddleware.checkAccessToken,
    authController.logoutUserFromAllDevices);

authRouter.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.loginUser);

authRouter.post('/password/forgot',
    userMiddleware.checkUserExistMiddleware,
    authController.createActionToken);

authRouter.post('/password/set/:token',
    userMiddleware.userValidationMiddleware(updateUserPasswordValidator),
    // userMiddleware.isUserPasswordForUpdateValid,
    authMiddleware.checkActionToken,
    authController.setNewPassword,
    authController.logoutUserFromAllDevices);

module.exports = authRouter;
