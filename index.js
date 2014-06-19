var express = require('express');
var app = express();

var config = require('./config');

var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

var io = require('socket.io').listen(server);
var fs = require('fs');

app.set('views','./views/pages')
app.set('view engine','jade')
app.use(express.static(__dirname + '/public'));


server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.get('/',function(req,res){
  res.render('index',{
    title:'happyedit',
    socketurl: config.serverurl + ":" + port
  });
});

var save = function(string) {
  fs.writeFile("/tmp/file.txt", string, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("The file was saved!");
    }
  });
};

var socks = [];
var body = "peter";
io.sockets.on('connection', function(socket) {
  socks.push(socket);
  socket.emit('refresh', {body: body});

  socket.on('refresh', function (body_) {
    console.log('new body');
    body = body_;
    console.log(body);
    console.log("-----");
    save(body);
  });

  console.log("user connected!");
  socket.on('change', function (op) {
    console.log(op);
    console.log("change hello");
    if (op.origin == '+input' || op.origin == 'paste' || op.origin == '+delete') {
      socks.forEach(function (sock) {
        if (sock != socket)
        sock.emit('change', op);
      });
    };
  });
});
