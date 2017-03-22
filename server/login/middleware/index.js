var users = require('../../users');
var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports = {
  validateLoginPostRequest: function(req, res, next) {
  	if(!req.body.username) return res.status(422).json({message: 'Missing required field username'});
    if(!req.body.password) return res.status(422).json({message: 'Missing required field password'});
    next();
  },
  findAndAuthenticateUser: function(req, res, next){
  users.schema.findOne({username: req.body.username}, function(err, user){
    if (err) return res.status(500).json({message: 'Internal server error'});
    if(!user) return res.status(401).json({message: 'Invalid username or password'});
    user.comparePassword(req.body.password, function(err, isMatch){
      console.log(user);
      if(isMatch) {
        req.orbit = {
          user: user
        };
        next();
      }
      else return res.status(401).json({message: 'Invalid username or password'});
      });
    });
  },
  signToken: function(req, res){
    var token = jwt.sign({
  		userId: req.orbit.user._id,
  		type: config.types.access_token
  	}, config.secret, {expiresIn: config.expiration.access_token});

  	var refreshToken = jwt.sign({
      userId: req.orbit.user._id,
  		type: config.types.refresh_token
  	}, config.secret, {expiresIn: config.expiration.refresh_token});

  	var data = {
  		access_token: token,
  		refresh_token: refreshToken
  	};
  	return res.status(200).json(data);
  },
    validateToken: function(req, res, next){
        if (!req.header('Authorization')) return res.status(401).json({message: 'Authorization header missing'});
        jwt.verify(req.header('Authorization'), config.secret, function (err, verified) {
            if (err) return res.status(401).json({message: err.message});
            if (verified.type !== config.types.access_token) return res.status(401).json({message: 'Not an access token.'});
            req.verified = verified;
            next();
        });
    }
}
