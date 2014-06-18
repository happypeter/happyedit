var express = require('express');
var app = express();

var server = require('http').createServer(app);
var port = 3000

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

var fs = require('fs');
fs.writeFile("/home/peter/file.txt", "Hey there!", function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("The file was saved!");
  }
});
