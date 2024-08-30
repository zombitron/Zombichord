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

        this.socket.on('chordTrigger', function (note) {
            this.music.startChord(note);
        }.bind(this));
        
        this.socket.on('chordRelease', function (note) {
            if(!this.chordMemory){
                this.music.stopChord(note);
            }
        }.bind(this));
        
        this.socket.on('7th', function (activated) {
            this.music.toggle7th(activated);
        }.bind(this));

        this.socket.on('chordMemory', function (activated) {
            this.chordMemory = activated;
        }.bind(this));

        this.socket.on('harp', function (note) {
            if(note >= 0 && note < 60 ){
                this.music.playHarp(note);
            }
        }.bind(this));
    }
}
export default zombichord