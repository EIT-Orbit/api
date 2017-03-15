var express = require('express');
var router = express.Router();
var middleware = require('./middleware');
var login = require('../login');

module.exports = function () {
  router.post('/fences',
      login.middleware.validateToken,
      middleware.validateFencePostRequest,
      middleware.parseGeojson,
      middleware.saveFence
  );

  router.get('/users/me/fences',
    login.middleware.validateToken,
    middleware.returnFencesForCurrentUser
  );

    return router;
}
