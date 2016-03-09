var express = require('express');
var http = require('http');

var socket = require('./routes/socket.js');

var app = express();
var server = http.createServer(app);

// Configuration //
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('port', 3000);

if(process.env.NODE_ENV === 'development'){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

// Socket.io Communication //
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
  console.log('Sick Socket, bro');
})

// Start server //
server.listen(app.get('port'), function(){
  console.log('Express server listen on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;







// var path = require('path');
// var fs = require('fs');
// var express = require('express');

// // Server part
// var app = express();
// app.use('/', express.static(path.join(__dirname, 'public')));

// var server = app.listen(80);
// console.log('Server listening on port 80');

// // Socket.IO part
// var io = require('socket.io')(server);

// var sendComments = function (socket) {
//   fs.readFile('_comments.json', 'utf8', function(err, comments) {
//     comments = JSON.parse(comments);
//     socket.emit('comments', comments);
//   });
// };

// io.on('connection', function (socket) {
//   console.log('New client connected!');
  
//   socket.on('fetchComments', function () {
//     sendComments(socket);
//   });

//   socket.on('newComment', function (comment, callback) {
//     fs.readFile('_comments.json', 'utf8', function(err, comments) {
//       comments = JSON.parse(comments);
//       comments.push(comment);
//       fs.writeFile('_comments.json', JSON.stringify(comments, null, 4), function (err) {
//         io.emit('comments', comments);
//         callback(err);
//       });
//     });
//   });
// });