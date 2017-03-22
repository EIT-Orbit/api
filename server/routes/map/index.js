var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var serverConfig = require('../../config/server.config');

module.exports = function () {
    router.post(
      '/',
      createBinary
    );
    return router;
};

function createBinary (req, res) {
  var points;
  if(req.body.geometry){
      points = req.body.geometry.coordinates[0];
  }else{
      points = req.body.features[0].geometry.coordinates[0];
  }
  const intArray = new Uint32Array((points.length-1)*2 + 1); //remove last point as it is same as first for a polygon. add 1 as first item in the array should be the
  intArray[0] = points.length-1; //first int in stream will tell how many points are in the stream
  var pos = 0;
  for(var i=0; i<points.length-1; i++){
    var latAsInt = parseInt(points[i][1] * Math.pow(10, 7));
    var lonAsInt = parseInt(points[i][0] * Math.pow(10, 7));
    intArray[pos+1] = latAsInt;
    intArray[pos+2] = lonAsInt;
    pos+=2;
  }

  var buf = Buffer.from(intArray.buffer, 0, intArray.buffer.length);

  var filePath = path.resolve('./public/fence');

  fs.writeFile(filePath, buf, function(err){
    if(err) {
      console.log(err);
    };
  });

  return res.status(200).json({url: serverConfig.ROOT_URL+'public/fence'});

  fs.open('binary.orbit', 'r', function(status, fd){
    var buffer = new Buffer(intArray.length);
    fs.read(fd, buffer, 0, intArray.length, 0, function(err, num){
      console.log(buffer.toString('utf-8', 0, num));
    })
  });

  var stat = fs.statSync('fence');
  res.writeHead(200, {
    'Content-Type': 'text/utf-8',
    'Content-Length': stat.size
  });

  var readStream = fs.createReadStream('fence');
  // We replaced all the event handlers with a simple call to readStream.pipe()
  readStream.pipe(res);
}
