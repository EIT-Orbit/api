var express = require('express');
var router = express.Router();
var middleware = require('./middleware');

module.exports = function () {
    router.post('/',
        middleware.validateUserPostRequest,
        middleware.validateUniqueUsername,
        middleware.storeUser
    );

    router.get('/', middleware.getUsers);

    return router;
}
