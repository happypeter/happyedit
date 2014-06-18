var express = require('express');
var app = express();

var server = require('http').createServer(app);
var port = 3000;

var io = require('socket.io').listen(server);
var fs = require('fs');

app.set('views','./views/pages')
app.set('view engine','jade')

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.get('/',function(req,res){
  res.render('index',{
    title:'影院热度播报',
  });
});

app.use(express.static(__dirname + '/public'));

var save = function(string) {
  fs.writeFile("/home/peter/file.txt", string, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("The file was saved!");
    }
  });
};

io.sockets.on('connection', function(socket) {
  socket.on('createNote', function() {
    //socket.broadcast.emit('onNoteCreated', data);
    fs.openSync("/home/peter/file.txt", 'w');
  });
  socket.on('updateNote', function(data) {
    save(data);
    console.log("updateNote");
  });
});


