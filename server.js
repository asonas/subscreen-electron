var io = require('socket.io').listen(3000);
console.log("launch!")
io.sockets.on('connection', function(socket) {
  socket.on('stream/tweet', function(data) {
    console.log(data)
    io.sockets.emit('stream/tweet', data);
  });
});
