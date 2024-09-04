import '/socket.io/socket.io.js';
import musicPlayer from '/assets/js/zombichord/music/music.js';

let zombichord = {
    socket: null,
    music: musicPlayer,
    chordMemory: false,
    initialized: false,
    started: false,
    initialize: async function () {
        this.socket = io();
        this.sendState();
        await new Promise((done) => {
            this.music.initialize().then(() => { done() });
        }).then(() => {
            this.initializeUI();
            this.initialized = true;
            this.sendState();
        });
    },
    sendState(){
        if(this.initialized){
            this.socket.emit('message', { id: 'state', value: 'loaded' });
        }else{
            this.socket.emit('message', { id: 'state', value: 'loading' });
        }
        if(this.started){
            this.socket.emit('message', { id: 'state', value: 'started' });
        }else{
            this.socket.emit('message', { id: 'state', value: 'stoped' });
        }
    },
    start(){
        this.started = true;
        this.sendState();
    },
    stop(){
        this.initialized = false;
        this.started = false;
        this.sendState();
    },
    initializeUI: function () {
        this.socket.on('chordTrigger', (note) => {
            this.music.startChord(note);
        });

        this.socket.on('chordRelease', (note) => {
            if (!this.chordMemory) {
                this.music.stopChord(note);
            }
        });

        this.socket.on('7th', (activated) => {
            this.music.toggle7th(activated);
        });

        this.socket.on('chordMemory', (activated) => {
            this.chordMemory = activated;
        });

        this.socket.on('harp', (note) => {
            if (note >= 0 && note < 60) {
                this.music.playHarp(note);
            }
        });

        this.socket.on('mute', () => {
            this.music.stopAll();
        });

        this.socket.on('hello', () => {
            this.sendState();
        });

        this.socket.on('chordVolume', (volume) => {
            this.music.setChordVolume(volume/100);
        });

        this.socket.on('harpVolume', (volume) => {
            this.music.setHarpVolume(volume/100);
        });
    }
}
export default zombichord;