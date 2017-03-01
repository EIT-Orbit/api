var express = require('express');
var router = express.Router();
var middleware = require('./middleware');

module.exports = function () {
    router.post('/login',
        middleware.validateLoginPostRequest,
        middleware.findAndAuthenticateUser,
        middleware.signToken
    );

    return router;
}
