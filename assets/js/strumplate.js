var canvas = document.getElementById("strumPlate");

function getMousePosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var tone = Math.floor((x / rect.width)*18);
    console.log (tone);
}

canvas.addEventListener("mousemove", function (e) {
    getMousePosition(canvas, e);
});

document.addEventListener("click", function(event) {
    document.querySelector('body').requestFullscreen();
}, { once: true });
