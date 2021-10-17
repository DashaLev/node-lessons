const { Schema, model } = require('mongoose');

const { POST_MODEL, USER_MODEL } = require('../configs');

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
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER_MODEL
    }
}, { timestamps: true });

module.exports = model(POST_MODEL, postSchema);
