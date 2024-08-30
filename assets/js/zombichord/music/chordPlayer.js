let chordPlayer = {
    chordsUrls: {
        "A3": "A3.wav",
        "A#3": "A#3.wav",
        "B3": "B3.wav",
        "C3": "C3.wav",
        "C#3": "C#3.wav",
        "D3": "D3.wav",
        "D#3": "D#3.wav",
        "E3": "E3.wav",
        "F3": "F3.wav",
        "F#3": "F#3.wav",
        "G3": "G3.wav",
        "G#3": "G#3.wav",
    },
    chordInstrument: 'chordPlayer2',
    ready: false,
    initialize: async function () {
        await new Promise((done) => {
            this.sampler = new Tone.Sampler({
                urls: this.chordsUrls,
                release: 0.1,
                attack: 0.1,
                volume: -10,
                onload: function(){
                    done();
                }.bind(this),
                baseUrl: "/assets/instruments/" + this.chordInstrument + "/"
            }).toDestination();
        }).then(() => {
            this.ready = true;
        })
    },
    startChord: function (notes) {
        if(this.ready){
            this.sampler.triggerAttack(notes);
        }
    },
    stopChord: function (notes) {
        this.sampler.triggerRelease(notes);
    }
}
export default chordPlayer