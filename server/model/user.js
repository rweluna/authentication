const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema(
    {
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    },
    { timestamps: true}
);

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
