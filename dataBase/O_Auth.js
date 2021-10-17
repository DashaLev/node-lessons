const { Schema, model } = require('mongoose');

const { O_AUTH_MODEL, USER_MODEL} = require('../configs');

const oAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true,
        trim: true
    },
    refresh_token: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER_MODEL
    }

}, { timestamps: true });

module.exports = model(O_AUTH_MODEL, oAuthSchema);
