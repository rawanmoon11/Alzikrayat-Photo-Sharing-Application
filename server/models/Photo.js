const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema(
    {

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        fileName: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,

        },
        dateTime: {
            type: Date,
            default: Date.now
        },

    });
const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;