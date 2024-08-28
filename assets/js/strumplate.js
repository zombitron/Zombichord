var canvas = document.getElementById("strumPlate");
var ctx = canvas.getContext("2d");

function getMousePosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.touches[0].clientX - rect.left;
    var tone = Math.floor((x / rect.width)*18);
    console.log (tone);
}

canvas.addEventListener("touchmove", function (e) {
    getMousePosition(canvas, e);
});

function createKeys() {
    var keyWidth = canvas.width / 18;
    for (var i = 0; i < 18; i++) {
        ctx.fillStyle = "#66828E";
        ctx.fillRect(i * keyWidth, 0, keyWidth, canvas.height);

        ctx.strokeStyle = "#fff";
        ctx.strokeRect(i * keyWidth, 0, keyWidth, canvas.height);
    }
}

createKeys();





document.addEventListener("click", function(event) {
    document.querySelector('body').requestFullscreen();
}, { once: true });
