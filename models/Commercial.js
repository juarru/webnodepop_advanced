/**
 * Created by juan_arillo on 20/9/17.
 *
 * Mongoose Commercials Models
 *
 */

'use strict';

// Loading mongoose
let mongoose = require('mongoose');

// Designing Commercial Schema
let commercialSchema = mongoose.Schema({
    name: {type: String, index: true, required: true},
    sell: {type: Boolean, index: true, required: true},
    price: {type: Number, index: true, required: true},
    photo: String,
    tags: [String]
},
    { collection : 'commercials'});

// Making a static method for filtering data
commercialSchema.statics.list = function (filter, start, limit, sort, field, total, cb) {
    let query = Commercial.find(filter);
    query.skip(start);
    query.limit(limit);
    query.sort(sort);
    query.select(field);
    if (total){
        query.count();
    }


    // Executing query - returning a promise
    return query.exec(cb);
};


// Assingning schema to model - Using var to use hoisting
var Commercial = mongoose.model('Commercial', commercialSchema, 'commercials');

module.exports = Commercial;
