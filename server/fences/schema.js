var mongoose = require('mongoose');

var FenceSchema = new mongoose.Schema({
    geoJSON: Object,
    name: {type: String},
    ownerId: {type: mongoose.Schema.Types.ObjectId}
});

module.exports = mongoose.model('Fence', FenceSchema);
