module.exports = {
    userNormalizator: (userNormalize= {}) => {
        const userNormalized = { ...userNormalize._doc };

        const fieldsToRemove = [
            'password',
            '__v'
        ];

        fieldsToRemove.forEach(field => {
            delete userNormalized[field];
        });

        return userNormalized;
    }
};
