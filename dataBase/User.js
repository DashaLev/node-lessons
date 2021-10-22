const { Schema, model } = require('mongoose');

const { userRoles, USER_MODEL } = require('../configs');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        select:false
    },
    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    },
    is_active: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

module.exports = model(USER_MODEL, userSchema);
