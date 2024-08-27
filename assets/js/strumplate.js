var sizeSequencer = [700, 200];
var rows = 1;
var bars = 18;
var matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // je pense pas besoi de ca 
]
var canvas = document.getElementById("strumPlate");
const ctx = canvas.getContext("2d");

function getMousePosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const tone = Math.floor((x / rect.width)*18);
    console.log (tone);
}

canvas.addEventListener("mousemove", function (e) {
    getMousePosition(canvas, e);
});

document.addEventListener("click", (event) => {
    document.querySelector('body').requestFullscreen();
    document.addEventListener("dblclick", (ev) => {
        window.location.reload();
        document.querySelector('body').requestFullscreen();
    });
}, { once: true });


// @Marion > la listen les positions sur le canvas html 

// Déclencher l'envoie du message WS ontouch ou mouse move
