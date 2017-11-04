/**
 * Created by juan_arillo on 20/9/17.
 *
 * Description: Module for manage Mongoose connection´s to Database
 *
 */

'use strict';

// Create connection variables
let mongoose = require('mongoose');
mongoose.promise = global.Promise; // Promise library to use
let connection = mongoose.connection;

// Connection events handlers

connection.on('error', function () {
    console.log('Connection error!');
});

// Database connection
mongoose.connect('mongodb://localhost:27017/webnodepop', {useMongoClient: true});

// Showing database connection information
connection.once('open', () => {
   console.log('Connected to MongoDB on ', mongoose.connection.name);
});