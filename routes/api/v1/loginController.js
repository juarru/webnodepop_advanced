'use strict';

const Usuario = require('../../../models/Users');
const jwt = require('jsonwebtoken');
// const i18n = require();

class LoginController {
    // POST /login
    async post(req, res, next) {
        const email = req.body.email;
        const hashedPassword = Users.hashedPassword(req.body.password);

        const password = hashedPassword;

        const user = await Users.findOne({ email: email, password: password });

        if (!user) {
            const error = new Error('Invalid Credentials');
            error.status = 403;
            next(error);
            return;
        }

        jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '2d'}, (err, token) => {
            if(err) {
                return next(err);
            }
            res.json({ ok: true, token: token, name: user.name});
        });
    }
}

module.exports = new LoginController();