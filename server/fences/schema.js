var mongoose = require('mongoose');

var FenceSchema = new mongoose.Schema({
	points: [{lat: String, lon: String}],
  name: {type: String},
  ownerId: {type: mongoose.Schema.Types.ObjectId}
});

module.exports = mongoose.model('Fence', FenceSchema);
