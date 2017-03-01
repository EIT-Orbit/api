var router = require('./route');
var middleware = require('./middleware');
module.exports = {
  routes: router,
  middleware: {
    validateToken: middleware.validateToken
  }
}
