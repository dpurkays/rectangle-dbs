const mongoose = require('mongoose');

const RectangleSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    color:  {
        type: String,
        default: "white"
    },
    description:  {
        type: String,
        default: ""
    },
    city:  {
        type: String,
        default: "Vancouver"
    },
});

module.exports = mongoose.model('Rectangle', RectangleSchema);
