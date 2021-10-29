const router = require('express').Router();

const { userRoles } = require('../configs');
const { userController } = require('../controllers');
const { userMiddleware, authMiddleware, fileMiddleware} = require('../middlewares');
const { createUserValidator, updateUserValidator } = require('../validators');

router.get('/',
    userController.getUsers);

router.post('/',
    userMiddleware.validationMiddleware(createUserValidator),
    fileMiddleware.checkUserAvatar,
    userMiddleware.checkIfEmailUnique,
    userController.createUser);

router.get('/:user_id',
    userMiddleware.checkUserExistById,
    userController.getUserById);

router.put('/:user_id',
    userMiddleware.validationMiddleware(updateUserValidator),
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserExistById,
    userController.updateUser);

router.delete('/:user_id',
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserExistById,
    userMiddleware.checkUserRole([
        userRoles.MANAGER,
        userRoles.ADMIN
    ]),
    userController.deleteUser);

module.exports = router;
