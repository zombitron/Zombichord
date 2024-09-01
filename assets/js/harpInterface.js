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

    zombichord.initialize(); // zombichord depend de tone js, c'est en ES6 

    socket.on('state', function (state) {
        if (state == 'ready') {
            harpContainer.classList.remove('loading');
        }
        if (state == 'loading') {
            harpContainer.classList.add('loading');
        }
    });

    document.addEventListener("click", function (event) {
        event.preventDefault;
        if (document.fullscreenEnabled) {
            // document.querySelector('body').requestFullscreen();
        }
        document.querySelector('.activate-screen').classList.add("activated");
    }, { once: true, passive: false });
}