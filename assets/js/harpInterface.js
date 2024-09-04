import '/socket.io/socket.io.js';
import strumPlate from '/assets/js/zombichord/ui/strumplate.js'; // charge la vue strumplate
import zombichord from '/assets/js/zombichord/zombichord.js'; // et le Zombichord

var socket = io();

var harpContainer = document.querySelector(".harpContainer");

if (harpContainer) {
    strumPlate.initialize(harpContainer);
    harpContainer.addEventListener('harp', function (e) {
        socket.emit('message', { id: 'harp', value: e.detail });
    });

    harpContainer.addEventListener('mute', function (e) {
        socket.emit('message', { id: 'mute'});
    });

    zombichord.initialize(); // zombichord depend de tone js, c'est en ES6 
    
    window.addEventListener("beforeunload", function(event) {
        zombichord.stop();
    });

    socket.on('state', function (state) {
        if (state == 'loaded') {
            harpContainer.classList.remove('loading');
        }
        if (state == 'loading') {
            harpContainer.classList.add('loading');
        }
        if (state == "started"){
            harpContainer.classList.add('started');
            
        }
    });

    document.addEventListener("click", function (event) {
        event.preventDefault;
        if (document.fullscreenEnabled) {
            // document.querySelector('body').requestFullscreen();
        }
        document.querySelector('.activate-screen > p').textContent = 'Loading';
        zombichord.start();
    }, { once: true, passive: false });
}
