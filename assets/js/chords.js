var chordNamesMaj = ["A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F", "C", "G", "D"];
var chordNamesm = ["F#m", "C#m", "G#m", "Ebm", "Bbm", "Fm", "Cm", "Gm", "Dm", "Am", "Em", "Bm"];

function createButtons(circleClass, chordNames, radius) {
    var circle = document.querySelector(circleClass);
    var sizeButton = [50, 50];

    for (let i = 0; i < chordNames.length; i++) {
        var button = document.createElement('button');

        button.classList.add("chordButton");
        button.textContent = chordNames[i];

        var angle = (i / chordNames.length) * 360;
        var x = radius * Math.cos(angle * (Math.PI / 180));
        var y = radius * Math.sin(angle * (Math.PI / 180));


        button.style.left = `calc(50% + ${x}px )`;
        button.style.top = `calc(50% + ${y}px )`;

        // TODO : Ajouter le listener pour declencher l'envoie du message WSocket
        circle.appendChild(button);
    }
}

createButtons('.innerCircle', chordNamesm, 120);
createButtons('.outerCircle', chordNamesMaj, 180);

document.addEventListener("click", (event) => {
    document.querySelector('body').requestFullscreen();
    document.addEventListener("dblclick", (ev) => {
        window.location.reload();
        document.querySelector('body').requestFullscreen();
    });
}, { once: true });