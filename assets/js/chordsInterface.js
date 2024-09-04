import '/socket.io/socket.io.js';
import chordsCircle from '/assets/js/zombichord/ui/chordsCircle.js'; // charge la vue circle
import controlRack from '/assets/js/zombichord/ui/controlRack.js'; 

window.addEventListener('load', function(){
    // listen ton chords event and send socket
    var socket = io();
    socket.emit('message', { id: 'hello'});
    
    var chordsContainer = document.querySelector(".chordsContainer");

    chordsContainer.classList.add('loading');

    chordsCircle.initialize(chordsContainer);

    chordsCircle.element.addEventListener('chordTrigger', function (e) {
        socket.emit('message', { id: 'chordTrigger', value: e.detail });
    });
    
    chordsCircle.element.addEventListener('chordRelease', function (e) {
        socket.emit('message', { id: 'chordRelease', value: e.detail });
    });
    
    chordsCircle.element.addEventListener('7th', function (e) {
        socket.emit('message', { id: '7th', value: e.detail });
    });
    

    // Controles 
    controlRack.initialize(chordsContainer);
    controlRack.element.addEventListener('chordMemory', function (e) {
        socket.emit('message', { id: 'chordMemory', value: e.detail });
    });
    
    socket.on('state', function (state) {
        if (state == 'loaded') {
            console.log("loaded")
        }
    
        if (state == 'started') {
            chordsContainer.classList.remove('loading');
            console.log("stared")
        }
    
        if (state == 'loading') {
            chordsContainer.classList.add('loading');
            console.log("loading")
        }
    });
})

document.addEventListener("click", function (event) {
    event.preventDefault;
    if (document.fullscreenEnabled) {
        // document.querySelector('body').requestFullscreen();
    }
}, { once: true, passive: false });
