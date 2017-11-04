'use strict';
const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = function() {
    return function(req, res, next) {
        // Checking if there´s any token
        console.log('estoy aquí');
        const token = req.body.token || req.query.token || req.get('x-access-token');
        if (!token) {
            const error = new Error('No token provided');
            error.status = 403;
            next(error);
            return;
        }

        var decoded = jwt.decode(token);
        var dateNow = new Date();
        if (decoded.exp * 1000 < dateNow.getTime()) {
            const err = res.status(401).json({ok: false, error: 'token invalid'}) ;

            return ;
        }

        // if authenticated, continue
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                err.status = 403;
                return next(err);
            }
            req.userId = decoded._id;
            next();
        });
    };
};