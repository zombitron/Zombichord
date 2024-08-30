import '/socket.io/socket.io.js';
import chordsCircle from '/assets/js/zombichord/ui/chordsCircle.js'; // charge la vue circle

// listen ton chords event and send socket
var socket = io();
chordsCircle.initialize();
chordsCircle.element.addEventListener('chordTrigger', function (e) {
    socket.emit('message', {id:'chordTrigger', value: e.detail});
});

chordsCircle.element.addEventListener('chordRelease', function (e) {
    socket.emit('message', {id:'chordRelease', value: e.detail});
});

chordsCircle.element.addEventListener('7th', function (e) {
    socket.emit('message', {id:'7th', value: e.detail});
});

chordsCircle.element.addEventListener('chordMemory', function (e) {
    socket.emit('message', {id:'chordMemory', value: e.detail});
});

// document.addEventListener("click", (event) => {
//     document.querySelector('body').requestFullscreen();
// }, { once: true });