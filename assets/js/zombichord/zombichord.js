import '/socket.io/socket.io.js';
import musicPlayer from '/assets/js/zombichord/music/music.js';

var zombichord = {
    socket: null,
    initialize: function () {
        this.music = musicPlayer;
        this.music.initialize();
        this.initializeUI();
    },
    initializeUI: function () {
        this.socket = io();

        this.socket.on('startChord', function (note) {
            this.music.startChord(note);
        }.bind(this));
        
        this.socket.on('stopChord', function (note) {
            this.music.stopChord(note);
        }.bind(this));
        
        this.socket.on('harp', function (note) {
            if(note >= 0 && note < 60 ){
                this.music.playHarp(note);
            }
        }.bind(this));
    }
}
export default zombichord