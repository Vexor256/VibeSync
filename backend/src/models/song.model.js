const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        enum: {
            values: [ "sad", "happy", "surprised", "neutral" ],
            message: "Enum this is"
        }
    }
})

const SongModel = mongoose.model('Song', songSchema);

module.exports = SongModel;
