const { Post } = require('../dataBase');

module.exports = {
    getAllPosts: (query = {}) => {
        const {
            perPage = 20,
            page = 1,
            sortBy = 'createdAt',
            order = 'desc'
        } = query;

        const findObject = {};

        const orderBy = order === 'desc' ? -1 : 1;

        return Post
            .find(findObject)
            .sort({ [sortBy]: orderBy })
            .limit(+perPage)
            .skip((page - 1) * perPage);
    }
};
