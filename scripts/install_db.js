/**
 * Created by juan_arillo on 20/9/17.
 *
 * Description: Script for set up Database. Delete collection if exist
 *              and create it again with some example data.
 */

'use strict';

function install(){
    console.log('Executing install script');

    // Creating connection variable
    let client = require('mongodb').MongoClient;

    // Connecting to Database
    client.connect('mongodb://localhost:27017/webnodepop', function(err, db){

        if (err) throw err;
        console.log('Connected to Database');

        // Drop commercials collection
        console.log('------ Starting Delete ------');
        console.log('Deleting commercials collection');
        db.collection('commercials').drop(function (err, status) {
            if (err) {
                console.log('The commercials collection doesn´t exists. Continue installing');
            }
            console.log('Deleted commercials collection. Status: ' + status);

            // Drop users collection
            console.log('Deleting users collection');
            db.collection('users').drop(function (err, status) {
                if (err) {
                    console.log('The users collection doesn´t exists. Continue installing');
                }
                console.log('Deleted users collection. Status: ' + status);

                // Drop tokens collection
                console.log('Deleting tokens collection');
                db.collection('tokens').drop(function (err, status) {
                    if (err) {
                        console.log('The tokens collection doesn´t exists. Continue installing');
                    }
                    console.log('Deleted tokens collection. Status: ' + status);

                    // Execute insertData after ensure collections has dropped
                    console.log('------ Starting Insert ------');
                    insertData(db);
                });
            });

        });

    });

}

function insertData(db){

    // Requiring filesystem
    let fs = require('fs');

    // Reading commercial JSON
    fs.readFile(__dirname + '/commercials.json', 'utf8', function (err, data) {
        if(err) throw err;
        console.log('Commercials loaded');

        let json = JSON.parse(data);

        // Inserting data into database
        console.log ('Inserting Commercials');
        db.collection('commercials').insert(json, function (err) {
            if (err) throw err;
            console.log('Commercials added.');
        });
    });

    // Reading users JSON
    fs.readFile(__dirname + '/users.json', 'utf8', function (err, data) {
        if(err) throw err;
        console.log('Users loaded');

        let json = JSON.parse(data);

        // Inserting data into database
        console.log ('Inserting Users');
        db.collection('users').insert(json, function (err) {
            if (err) throw err;
            console.log ('Users added.');

            // Close connection
            db.close();

        });


    });
}


install();