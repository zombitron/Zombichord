var chordsCircle = {
    chordsMaj: ["A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F", "C", "G", "D"],
    chordsMin: ["F#m", "C#m", "G#m", "Ebm", "Bbm", "Fm", "Cm", "Gm", "Dm", "Am", "Em", "Bm"],
    element: null,
    currentChord: null,
    initialize: function (container) {
        this.element = container;
        this.createCircle('.innerCircle', this.chordsMin);
        this.createCircle('.outerCircle', this.chordsMaj);

        // cree le 7th
        this.createOptionButton('.septiemeButton', '7th');

        this.currentChord = this.element.querySelector(".currentChord");
    },
    createCircle: function (circleClass, chordNames) {
        var circle = this.element.querySelector(circleClass);
        for (let i = 0; i < chordNames.length; i++) {
            var angle = (i / chordNames.length) * 360;
            var x = 50 * Math.cos(angle * (Math.PI / 180));
            var y = 50 * Math.sin(angle * (Math.PI / 180));
            var button = this.createButton(x, y, chordNames[i]);
            circle.appendChild(button);
        }
    },
    createButton: function (posX, posY, chord) {
        var button = document.createElement('button');
        button.classList.add("chordButton");
        button.textContent = chord;
        button.value = chord;
        button.style.left = `calc(50% + ${posX}% )`;
        button.style.top = `calc(50% + ${posY}% )`;

        button.addEventListener("touchstart", function (e) {
            e.preventDefault();
            var event = new CustomEvent("chordTrigger", { detail: button.value });
            this.element.dispatchEvent(event);
            this.currentChord.textContent = button.value;
        }.bind(this));

        button.addEventListener("touchend", function (e) {
            e.preventDefault();
            var event = new CustomEvent("chordRelease", { detail: button.value });
            this.element.dispatchEvent(event);
        }.bind(this));
        return button;
    },
    createOptionButton(buttonClass, eventName) {
        var optionButton = this.element.querySelector(buttonClass);
        optionButton.addEventListener("change", function (e) {
            var event = new CustomEvent(eventName, { detail: e.target.checked });
            this.element.dispatchEvent(event);
        }.bind(this));
    }
}
export default chordsCircle;