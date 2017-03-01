var fenceSchema = require('./schema');

module.exports = {
  validateFencePostRequest: function(req, res, next) {
  	if(!req.body.fenceName) return res.status(422).json({message: 'Missing required field fenceName'});
    if(!req.body.features) return res.status(422).json({message: 'Missing geojson'});
    next();
  },
  saveFence: function(req, res){
    var newFence = new fenceSchema(req.body);
    newFence.ownerId = req.verified.id;
    newFence.save(function(err){
      if(err) return res.status(500).json({message: 'error saving fence'});
      return res.status(200).json(newFence);
    });
  }
}
