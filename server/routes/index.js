var express = require('express');
var router = express.Router();
var mapRouter = require('./map')
var users = require('../users');
var login = require('../login');
var fences = require('../fences');

module.exports = function () {
	router.get('/', function (req, res) {
		res.send('API running');
	});
	router.use('/map', mapRouter());
	router.use('/users', users.routes());
	router.use('', login.routes());
	router.use('', fences.routes());
	return router;
};
