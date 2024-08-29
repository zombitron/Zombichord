import '/socket.io/socket.io.js';
import strumPlate from '/assets/js/zombichord/ui/strumplate.js'; // charge la vue strumplate

var socket = io();
strumPlate.initialize();
strumPlate.element.addEventListener('harp', function (e) {
    socket.emit('message', {id:'harp', value: e.detail});
});

document.addEventListener("click", (event) => {
    document.querySelector('body').requestFullscreen();
}, { once: true });