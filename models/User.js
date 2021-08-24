const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create our Schema
const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    checkins: [{
        type: Schema.Types.ObjectId,
        ref: "checkin"
    }],
    registrationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);