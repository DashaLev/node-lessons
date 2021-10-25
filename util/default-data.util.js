const { userRoles: { ADMIN }, DEFAULT_ADMIN_PASSWORD } = require('../configs');
const { User } = require('../dataBase');
const { passwordService } = require('../services');

module.exports = async () => {
    const user = await User.findOne({ role: ADMIN });

    if (!user) {
        const hashedPassword = await passwordService.hash(DEFAULT_ADMIN_PASSWORD);

        await User.create({
            name: 'Rick',
            email: 'admin@gmail.com',
            password: hashedPassword,
            role: ADMIN,
            is_active: true
        });
    }
};
