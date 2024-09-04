var controlRack = {
    element: null,
    currentChord: null,
    initialize: function (container) {
        this.element = container;
        this.createCheckButton('.memoryButton', 'chordMemory');
        this.createSlider('.chordvolume', 'chordVolume');
        this.createSlider('.harpvolume', 'harpVolume');
    },
    createCheckButton(buttonClass, eventName) {
        var optionButton = this.element.querySelector(buttonClass);
        optionButton.addEventListener("input", function (e) {
            var event = new CustomEvent(eventName, { detail: e.target.checked });
            this.element.dispatchEvent(event);
        }.bind(this));
    },
    createSlider(sliderClass, eventName){
        var slider = this.element.querySelector(sliderClass);
        slider.addEventListener("input", function (e) {
            var event = new CustomEvent(eventName, { detail: e.target.value });
            this.element.dispatchEvent(event);
        }.bind(this));
    }
}
export default controlRack;