'use strict';

const mongoose = require('mongoose');
const hash = require('hash.js');

const usersSchema = mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
});

usersSchema.statics.hashedPassword = function (password) {
    return hash.sha256().update(password).digest('hex');
};

var Users = mongoose.model('Users', usersSchema);
module.exports = Users;