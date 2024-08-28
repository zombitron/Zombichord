import '/socket.io/socket.io.js';

var strumPlate = {
    socket: null,
    keysNumber:  60, // ( 5 * 12 )
    currentTone : null,
    initialize(){
        this.socket = io();
        this.canvas = document.getElementById("strumPlate");
        this.rect = this.canvas.getBoundingClientRect();
        this.canvas.addEventListener("touchstart", function (e) {
            this.onTouchEvent(e);
        }.bind(this));
        
        this.canvas.addEventListener("touchmove", function (e) {
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
                this.socket.emit('message', {id:'harp', value: tone});
                this.currentTone = tone;
            }else if (e.type == 'touchmove'){
                if(this.currentTone != tone){
                    this.socket.emit('message', {id:'harp', value: tone});
                    this.currentTone = tone;
                }
            }
        }
    },
    createKeys() {
        var ctx = this.canvas.getContext("2d");
        var keyWidth = this.canvas.width / this.keysNumber;
        for (var i = 0; i < this.keysNumber; i++) {
            ctx.fillStyle = "#66828E";
            ctx.fillRect(i * keyWidth, 0, keyWidth, this.canvas.height);

            ctx.strokeStyle = "#fff";
            ctx.strokeRect(i * keyWidth, 0, keyWidth, this.canvas.height);
        }
    }
};

strumPlate.initialize();

document.addEventListener("click", function(event) {
    document.querySelector('body').requestFullscreen();
}, { once: true });
