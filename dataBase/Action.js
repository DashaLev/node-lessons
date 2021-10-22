const { Schema, model } = require('mongoose');

const { ACTION_MODEL, USER_MODEL, actionTokenTypes } = require('../configs');

const ActionSchema = new Schema({
    token: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        default: actionTokenTypes.FORGOT_PASSWORD,
        enum: Object.values(actionTokenTypes),
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER_MODEL
    }
}, { timestamps: true });

ActionSchema.pre('findOne', function() {
    this.populate('user_id');
});

module.exports = model(ACTION_MODEL, ActionSchema);
