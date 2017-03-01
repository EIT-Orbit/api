var userSchema = require('../schema');

module.exports = {
  validateUserPostRequest: function(req, res, next) {
  	if(!req.body.username) return res.status(422).json({message: 'Missing required field username'});
    if(!req.body.password) return res.status(422).json({message: 'Missing required field password'});
    next();
  },
  validateUniqueUsername: function(req, res, next) {
  	userSchema.findOne({username: req.body.username}, function (err, user) {
  		if (err) return res.status(500).json({message: 'Internal server error'});
  		if (user) {
  	     return res.status(409).json({message: 'Username already exists'});
  		}
  		next();
  	});
  },
  storeUser: function(req, res){
    var newUser = new userSchema(req.body);
    newUser.save(function(err){
      if (err) return res.status(500).json({message: 'Internal server error'});
      return res.status(200).json({message: 'User created'})
    })
  },
  getUsers: function(req, res){
    userSchema.find({}, '_id username', function(err, users){
      if (err) return res.status(500).json({message: 'Internal server error'});
      return res.status(200).json(users);
    });
  }
}
