import '/socket.io/socket.io.js';
import chordsCircle from '/assets/js/zombichord/ui/chordsCircle.js'; // charge la vue circle
import zombichord from '/assets/js/zombichord/zombichord.js'; // et le Zombichord

// listen ton chords event and send socket
var socket = io();
chordsCircle.initialize();
chordsCircle.element.addEventListener('startChord', function (e) {
    socket.emit('message', {id:'startChord', value: e.detail});
});
chordsCircle.element.addEventListener('stopChord', function (e) {
    socket.emit('message', {id:'stopChord', value: e.detail});
});

zombichord.initialize();

document.addEventListener("click", (event) => {
    document.querySelector('body').requestFullscreen();
}, { once: true });