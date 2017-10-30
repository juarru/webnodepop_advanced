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




module.exports = router;
