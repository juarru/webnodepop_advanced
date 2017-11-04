'use strict';

const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.promise = global.Promise;
const User = mongoose.model('Users');
const errors = require('../../../lib/errorHandler');
const sha = require('sha256');
const config = require('../../../lib/jwtAuth');

router.post('/', function (req, res) {
    let email = req.body.email;
    let pass = req.body.key;

    if (pass){
        pass = sha(pass);
    }
    console.log(email);
    console.log(pass);

    User.findOne({email: email, key: pass}).exec(function (err, user){

        // Controlling server error
        if(err){
            const error = new Error();
            error.message = 'server';
            error.language = req.lang;
            error.status = 500;
            errors(error, res);
            return;
        }

        // Controlling email field
        if(!email){
            const error = new Error();
            error.message = 'email';
            error.language = req.lang;
            error.status = 401;
            errors(error, res);
            return;
        }

        // Controlling pass field
        if(!pass){
            const error = new Error();
            error.message = 'key';
            error.language = req.lang;
            error.status = 401;
            errors(error, res);
            return;
        }

        jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '2 days'
        }, (err,  token) => {
            if(err) {
                return next(err);
            }
            res.json({success: true, token: token, name: user.name});
        });
    });
});


// Exporting the router
module.exports = router;