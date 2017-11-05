'use tsrict';

const Usuario = require('../models/Users');
const jwt = require('jsonwebtoken');

class LoginController {

  async authJWT(req, res, next) {
    const email = req.body.email;
    const password = req.body.key;
    const errors = require('../lib/errorHandler');
    const hashedPassword = Usuario.hashedPassword(password);

    console.log(email);
    console.log(hashedPassword);

    const user = await Usuario.findOne({ email: email, key: hashedPassword });

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
    if(!password){
        const error = new Error();
        error.message = 'key';
        error.language = req.lang;
        error.status = 401;
        errors(error, res);
        return;
    }

    jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2d'
    }, (err, token) => {
      if (err) {
        return next(err);
      }
      res.json({ok: true, token: token});

    });
  }
}

module.exports = new LoginController();
