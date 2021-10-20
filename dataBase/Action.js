const { Schema, model } = require('mongoose');

const { ACTION_MODEL, USER_MODEL, actionTypes} = require('../configs');

const ActionSchema = new Schema({
    token: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        default: actionTypes.ACTION_FORGOT_PASSWORD,
        enum: Object.values(actionTypes)
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER_MODEL
    }
}, { timestamps: true });

module.exports = model(ACTION_MODEL, ActionSchema);
