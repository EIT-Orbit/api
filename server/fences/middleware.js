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
    newFence.name = req.body.fenceName;
    newFence.points = req.body.parsedPoints;
    newFence.save(function(err){
      if(err) return res.status(500).json({message: 'error saving fence'});
      return res.status(200).json(newFence);
    });
  },
  parseGeojson: function(req, res, next){
    var parsedPoints = [];
    var points = req.body.features[0].geometry.coordinates[0];
    for(var i=0; i<points.length-1; i++){
      parsedPoints.push({
        lat: points[i][1],
        lon: points[i][0]
      });
    }
    req.body.parsedPoints = parsedPoints;
    next();
  },
  returnFencesForCurrentUser: function(req, res){
    fenceSchema.find({ownerId: req.verified.id}, function(err, fences){
      if(err) return res.status(500).json({message: 'error retrieving fences'});
      return res.status(200).json(fences);
    })
  }
}
