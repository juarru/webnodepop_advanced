"use strict";

let express = require('express');
let router = express.Router();
let commercials = require('./../models/Commercial');


/* GET home page. */
router.get('/', function(req, res, next) {

  commercials.find({}, function (err, data) {
     if(err) {
        res.send(err);
     }

    res.render('index', {
        title: 'Juan Arillo - WebNodepop',
        commercial: data,
    });

  });

});

// Rendering filter in URL
router.get('/api/v1/commercials', (req, res, next) => {
    console.log(req.query);

    commercials.find(req.query, function (err, data) {
        if(err) {
            res.send(err);

        }

        res.render('index', {
            title: 'Juan Arillo - WebNodepop',
            commercial: data,
        });

    });
});

// Languaje routing
router.get('/lang/:locale', (req,res, next) => {
    const locale = req.params.locale;
    const referer = req.get('referer');
    res.cookie('nodeapi-lang', locale, { maxAge: 90000000, httpOnly: true });
    res.redirect(referer);
});




module.exports = router;
