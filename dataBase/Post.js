const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
    },
    post_body: {
        type: String,
        required: true,
        trim: true,
        minLength: 30,
    },
    user_id: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = model('post', postSchema);
