var chordsCircle = {
    chordsMaj : ["A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F", "C", "G", "D"],
    chordsMin : ["F#m", "C#m", "G#m", "Ebm", "Bbm", "Fm", "Cm", "Gm", "Dm", "Am", "Em", "Bm"],
    element: null,
    buttons : [],
    currentChord: null,
    initialize: function(){
        this.element = document.querySelector(".chordsContainer");
        this.createCircle('.innerCircle', this.chordsMin, 120);
        this.createCircle('.outerCircle', this.chordsMaj, 180);

        // cree le 7th
        this.createOptionButton('.septiemeButton', '7th');
        // bouton chord memory
        this.createOptionButton('.memoryButton', 'chordMemory');

        this.currentChord = document.querySelector(".currentChord");
    },
    createCircle: function(circleClass, chordNames, radius) {
        var circle = document.querySelector(circleClass);
        for (let i = 0; i < chordNames.length; i++) {
            var angle = (i / chordNames.length) * 360;
            var x = radius * Math.cos(angle * (Math.PI / 180));
            var y = radius * Math.sin(angle * (Math.PI / 180));
            var button = this.createButton(x, y, chordNames[i]);
            circle.appendChild(button);
            this.buttons.push(button);
        }
    },
    createButton: function(posX, posY, chord){
        var button = document.createElement('button');
        button.classList.add("chordButton");
        button.textContent = chord;
        button.value = chord;
        button.style.left = `calc(50% + ${posX}px )`;
        button.style.top = `calc(50% + ${posY}px )`;
        button.addEventListener("touchstart", function(e){
            e.preventDefault();
            var event = new CustomEvent("chordTrigger", {detail: button.value} );
            this.element.dispatchEvent(event)
            this.currentChord.textContent = button.value;
        }.bind(this));

        button.addEventListener("touchend", function(e){
            e.preventDefault();
            var event = new CustomEvent("chordRelease", {detail: button.value} );
            this.element.dispatchEvent(event);
            this.currentChord.textContent = '';
        }.bind(this));
        return button;
    },
    createOptionButton(buttonClass, eventName){
        var optionButton = document.querySelector(buttonClass);
        optionButton.addEventListener("change", function(e){
            var event = new CustomEvent(eventName, {detail: e.target.checked});
            this.element.dispatchEvent(event);
        }.bind(this));
    }
}
export default chordsCircle