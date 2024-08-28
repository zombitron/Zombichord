var chordPlayer = {
    chordsUrls: {
        "A2": "A2.wav",
        "A#2": "A#2.wav",
        "B2": "B2.wav",
        "C2": "C2.wav",
        "C#2": "C#2.wav",
        "D2": "D2.wav",
        "D#2": "D#2.wav",
        "E2": "E2.wav",
        "F2": "F2.wav",
        "F#2": "F#2.wav",
        "G2": "G2.wav",
        "G#2": "G#2.wav",
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
    playing: false,
    ready: false,
    initialize: function () {
        this.sampler = new Tone.Sampler({
            urls: this.chordsUrls,
            release: 0.1,
            attack: 0.1,
            volume: -10,
            onload: function(){
                this.ready = true;
            }.bind(this),
            baseUrl: "/assets/instruments/" + this.chordInstrument + "/"
        }).toDestination();
    },
    startChord: function (notes) {
        if(this.ready){
            this.notes = notes;
            this.sampler.triggerAttack(notes);
            this.playing = true;
        }
    },
    stopChord: function () {
        this.sampler.triggerRelease(this.notes);
        this.playing = false;
    }
}
export default chordPlayer