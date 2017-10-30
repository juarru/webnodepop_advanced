/**
 * Created by juan_arillo on 20/9/17.
 *
 * Description: Commercials controller for API
 *
 * Version: v1
 *
 */

'use strict';

// Loading express and router

let express = require('express');
let router = express.Router();

// Loading Mongoose and Commercial´s model

let mongoose = require('mongoose');
let Commercial = mongoose.model('Commercial');

// Loading errors handler library
let errors = require('../../../lib/errorHandler');

// Returning data

router.get('/', function (req, res, next) {
    let name = req.query.name;
    let venta = req.query.sell;
    let tags = req.query.tags;
    let precio = req.query.price;
    let start = parseInt(req.query.start) || 0;
    let limit = parseInt(req.query.limit);
    let sort = req.query.sort || null;
    let field = req.query.field || null;
    let total = req.query.total || false;

    let criteria = {};

    if(typeof name !== 'undefined'){
        criteria.name = name;
    }
    if(typeof venta !== 'undefined'){
        criteria.sell = venta;
    }
    if(typeof tags !== 'undefined'){
        criteria.tags = tags;
    }

    // Controlling field 'nombre' search with the string
    // passed in the request. Using a RegExp function for searching
    if (name){

        let $regex = new RegExp('^' + name, 'i');
        criteria.name = {$regex};

    }


    // Controlling tags search in case of more than one
    // searching option.
    if (tags && tags[1].length > 1){
        let $in = tags;
        criteria.tags = {$in};
    }


    // Controlling if 'precio' data is a range
    // If it´s, split the values and pass the filter as
    // variables
    if (precio){
        let number = precio.search('-');
        if (number !== -1) {
            let valores = precio.split('-');
            let $gte = parseFloat(valores[0]);
            let $lte = parseFloat(valores[1]);

            // Controling if the range has a max
            // and a min or only one of them

            if (isNaN($lte)){
                criteria.price = {$gte};
            } else if (isNaN($gte)){
                criteria.price = {$lte};
            } else {
                criteria.price = {$gte,$lte};
            }

        } else {
            criteria.price = parseFloat(precio);
        }
    }

    // Passing the query variables to the model function
    Commercial.list(criteria, start, limit, sort, field, total, function(err, rows){
        if(err){
            // Returning understable error
            return res.json({success:false, error: err});
        }
        res.json({success: true, rows: rows});

    });

});

// Adding and saving commercial´s instance

router.post('/', function (req, res, next) {
    let commercial = new Commercial(req.body);

    // Controlling fields validation
    try {
        let errors = commercial.validateSync();
    } catch (err){
       console.log('errors', error);
        next(err);
    }

    commercial.save(function (err, saved) {
        if(err){
            let error = new Error();
            error.message = 'auth';
            error.language = req.lang;
            error.status = 500;
            errors(error, res);
            return;
        }

        res.json({success: true, saved: saved});
    });
});

// Exporting the router
module.exports = router;
