module.exports = {
    userNormalizer: (userNormalize = {}) => {
        const fieldsToRemove = [
            'password',
            '__v'
        ];

        fieldsToRemove.forEach((field) => {
            delete userNormalize[field];
        });

        return userNormalize;
    }
};
