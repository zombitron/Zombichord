const Zombitron = require("./src/Zombitron")
const zombitronica = new Zombitron();

zombitronica.app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/chords.html');
});

zombitronica.app.get('/strumplate', function (req, res) {
  res.sendFile(__dirname + '/views/harp.html');
});

zombitronica.socketServer.on('connection', (socket) => {
  socket.on('message', (msg) => {
    zombitronica.socketServer.emit(msg.id, msg.value);
  });
});

zombitronica.start();