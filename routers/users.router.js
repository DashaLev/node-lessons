const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userController.getUsers);

router.post('/', userMiddleware.createUserMiddleware, userController.createUser);

router.get('/:user_id', userMiddleware.checkUserExistMiddleware, userController.getUserById);

router.put('/:user_id', userMiddleware.checkUserExistMiddleware, userController.updateUser);

router.delete('/:user_id', userMiddleware.checkUserExistMiddleware, userController.deleteUser);

module.exports = router;
