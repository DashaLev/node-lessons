const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');
const { userRoles } = require('../configs');

router.get('/',
    userController.getUsers);

router.post('/',
    userMiddleware.isUserBodyValid,
    userMiddleware.createUserMiddleware,
    userController.createUser);

router.get('/:user_id',
    userMiddleware.checkUserExistMiddleware,
    userController.getUserById);

router.put('/:user_id',
    userMiddleware.isUserBodyForUpdateValid,
    userMiddleware.checkUserExistMiddleware,
    userController.updateUser);

router.delete('/:user_id',
    userMiddleware.checkUserExistMiddleware,
    userMiddleware.checkUserRole([userRoles.USER]),
    userController.deleteUser);

module.exports = router;
