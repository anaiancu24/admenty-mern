const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create our Schema
const CheckinSchema = new Schema({
    mood:{
        type: String,
        required: true
    },
    positivity: {
        type: Number
    },
    happiness: {
        type: String
    },
    notes: {
        type: String
    },                                                                  
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
});

module.exports = Checkin = mongoose.model('checkin', CheckinSchema);