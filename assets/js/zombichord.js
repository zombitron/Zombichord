import '/socket.io/socket.io.js';
import musicPlayer from '/assets/js/music.js';
import chordsCircle from  '/assets/js/chordsCircle.js';
var zombichord = {
    initialize: function(){
        this.music = musicPlayer;
        this.music.initialize();
        this.initializeUI();
    },
    initializeUI: function () {
        this.socket = io();
        
        chordsCircle.initialize(this);
        chordsCircle.element.addEventListener('startChord', function(e){
            this.music.playChord(e.detail);
        }.bind(this))
        chordsCircle.element.addEventListener('stopChord', function(e){
            this.music.stopChord(e.detail);
        }.bind(this))
        // this.socket.on('harp', function(data) {
        //     this.music.startChord(data);
        // }.bind(this));
    }
}

zombichord.initialize();

// document.addEventListener("click", (event) => {
//     document.querySelector('body').requestFullscreen();
// }, { once: true });