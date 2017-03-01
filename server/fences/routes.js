var express = require('express');
var router = express.Router();
var middleware = require('./middleware');
var login = require('../login');

module.exports = function () {
    router.post('/fences',
        login.middleware.validateToken,
        middleware.validateFencePostRequest,
        middleware.saveFence
    );

    return router;
}
