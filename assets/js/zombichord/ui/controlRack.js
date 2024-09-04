var controlRack = {
    element: null,
    currentChord: null,
    initialize: function (container) {
        this.element = container;
        this.createCheckButton('.memoryButton', 'chordMemory');
    },
    createCheckButton(buttonClass, eventName) {
        var optionButton = this.element.querySelector(buttonClass);
        optionButton.addEventListener("change", function (e) {
            var event = new CustomEvent(eventName, { detail: e.target.checked });
            this.element.dispatchEvent(event);
        }.bind(this));
    }
}
export default controlRack;