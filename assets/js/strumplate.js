var canvas = document.getElementById("strumPlate");

function getMousePosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.touches[0].clientX - rect.left;
    var tone = Math.floor((x / rect.width)*18);
    console.log (tone);
}

canvas.addEventListener("touchmove", function (e) {
    getMousePosition(canvas, e);
});

document.addEventListener("click", function(event) {
    document.querySelector('body').requestFullscreen();
}, { once: true });
