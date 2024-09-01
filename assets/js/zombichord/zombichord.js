import '/socket.io/socket.io.js';
import musicPlayer from '/assets/js/zombichord/music/music.js';

let zombichord = {
    socket: null,
    music: musicPlayer,
    chordMemory: false,
    initialize: async function () {
        this.socket = io();

        this.socket.emit('message', { id: 'state', value: 'loading' });

        await new Promise((done) => {
            this.music.initialize().then(() => { done() });
        }).then(() => {
            this.initializeUI();
            this.socket.emit('message', { id: 'state', value: 'ready' });
        });
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
    }
}
export default zombichord;