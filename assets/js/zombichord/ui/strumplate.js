var strumPlate = {
    socket: null,
    keysNumber: 60, // ( 5 * 12 )
    currentTone: null,
    element: null,
    initialize(harpContainer) {
        this.element = harpContainer;
        this.strumplate = this.element.querySelector("#strumPlate");
        this.muteButton = this.element.querySelector(".muteButton");
        this.rect = this.strumplate.getBoundingClientRect();
        this.strumplate.addEventListener("touchstart", function (e) {
            this.onTouchEvent(e);
        }.bind(this));

        this.strumplate.addEventListener("touchmove", function (e) {
            this.onTouchEvent(e);
        }.bind(this));
        this.muteButton.addEventListener("touchstart", function(e){
            this.onMuteEvent(e);
        }).bind(this);
        this.muteButton.addEventListener("touchend", function (e) {
            this.onMuteEvent(e);
        }).bind(this);

        this.createKeys();
    },
    onTouchEvent(e) {
        e.preventDefault();
        for (var i = 0; i < e.touches.length; i += 1) {
            var x = e.touches[i].clientX - this.rect.left;
            var tone = Math.floor((x / this.rect.width) * this.keysNumber);
            if (e.type == 'touchstart') {
                var event = new CustomEvent("harp", { detail: tone });
                this.element.dispatchEvent(event);
                this.currentTone = tone;

            } else if (e.type == 'touchmove') {
                if (this.currentTone != tone) {
                    var event = new CustomEvent("harp", { detail: tone });
                    this.element.dispatchEvent(event);
                    this.currentTone = tone;
                }
            }
        }
    },
    createKeys() {
        var ctx = this.strumplate.getContext("2d");
        var keyWidth = this.strumplate.width / this.keysNumber;
        for (var i = 0; i < this.keysNumber; i++) {
            ctx.fillStyle = "#66828E";
            ctx.fillRect(i * keyWidth, 0, keyWidth, this.strumplate.height);

            ctx.strokeStyle = "#fff";
            ctx.strokeRect(i * keyWidth, 0, keyWidth, this.strumplate.height);
        }
    },
    OnMuteEvent() {
        e.preventDefault();
        if (e.type == 'touchstart') {
            var event = new CustomEvent("mute", { detail: button.value });
            this.element.dispatchEvent(event);
        } else if (e.type == 'touchend') {
            var event = new CustomEvent("unMute", { detail: button.value });
            this.element.dispatchEvent(event);
        }
    }
};
export default strumPlate;