/**
 * Created by juan_arillo on 20/9/17.
 *
 * Description: Module for handler errors from controller files
 *
 */

'use strict';

function errorHandler (err, res){

    // requiring languaje dictionary
    let response = require('./errorDictionaryEng');
    let respuesta = require('./errorDictionaryEsp');

    if (err.language === 'es'){
        switch (err.message) {
            case 'auth':
                res.status(err.status);
                err.message = respuesta.auth;
                break;
            case 'token':
                res.status(err.status);
                err.message = respuesta.token;
                break;
            case 'key':
                res.status(err.status);
                err.message = respuesta.key;
                break;
            case 'users':
                res.status(err.status);
                err.message = respuesta.users;
                break;
            case 'server':
                res.status(err.status);
                err.message = respuesta.server;
                break;
            case 'email':
                res.status(err.status);
                err.message = respuesta.email;
                break;
            case 'pwd':
                res.status(err.status);
                err.message = respuesta.pwd;
                break;
        }
    }

    switch (err.message) {
        case 'auth':
            res.status(err.status);
            err.message = response.auth;
            break;
        case 'token':
            res.status(err.status);
            err.message = response.token;
            break;
        case 'key':
            res.status(err.status);
            err.message = response.key;
            break;
        case 'users':
            res.status(err.status);
            err.message = response.users;
            break;
        case 'server':
            res.status(err.status);
            err.message = response.server;
            break;
        case 'email':
            res.status(err.status);
            err.message = response.email;
            break;
        case 'pwd':
            res.status(err.status);
            err.message = response.pwd;
            break;
    }

    res.json({success: false, error: err.message});
}

module.exports = errorHandler;