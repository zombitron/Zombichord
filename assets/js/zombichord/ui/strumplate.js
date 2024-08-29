var strumPlate = {
    socket: null,
    keysNumber:  60, // ( 5 * 12 )
    currentTone : null,
    initialize(){
        this.element = document.getElementById("strumPlate");
        this.rect = this.element.getBoundingClientRect();
        this.element.addEventListener("touchstart", function (e) {
            this.onTouchEvent(e);
        }.bind(this));
        
        this.element.addEventListener("touchmove", function (e) {
            this.onTouchEvent(e);
        }.bind(this));
        this.createKeys();
    },
    onTouchEvent(e) {
        e.preventDefault();
        for(var i = 0; i< e.touches.length; i+=1){
            var x = e.touches[i].clientX - this.rect.left;
            var tone = Math.floor((x / this.rect.width) * this.keysNumber);
            if(e.type == 'touchstart'){
                var event = new CustomEvent("harp", {detail: tone} );
                this.element.dispatchEvent(event)
                this.currentTone = tone;

            }else if (e.type == 'touchmove'){
                if(this.currentTone != tone){
                    var event = new CustomEvent("harp", {detail: tone} );
                    this.element.dispatchEvent(event)
                    this.currentTone = tone;
                }
            }
        }
    },
    createKeys() {
        var ctx = this.element.getContext("2d");
        var keyWidth = this.element.width / this.keysNumber;
        for (var i = 0; i < this.keysNumber; i++) {
            ctx.fillStyle = "#66828E";
            ctx.fillRect(i * keyWidth, 0, keyWidth, this.element.height);

            ctx.strokeStyle = "#fff";
            ctx.strokeRect(i * keyWidth, 0, keyWidth, this.element.height);
        }
    }
};
export default strumPlate;