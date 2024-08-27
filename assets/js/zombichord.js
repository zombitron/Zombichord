import '/socket.io/socket.io.js';
import musicPlayer from '/assets/js/music.js';

var zombichord = {
    initialize: function(){
        this.initializeSocket();
        this.music = musicPlayer;
        this.music.initialize();
    },
    initializeSocket: function () {
        this.socket = io();
        this.socket.on('chord', function(data) {
            this.music.playChord(data);
        }.bind(this));
    }
}

zombichord.initialize();