const mongoose = require('mongoose');

const userSchma = new mongoose.Schema(
    {

        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

            required: true
        },
        password: {
            type: String,
            required: true
        },
        location: {
            type: String, required: false
        },

        description: {
            type: String,
            required: false
        },
        occupation: {
            type: String,
            required: false

        }
    });
const User = mongoose.model('User', userSchma);
module.exports = User;