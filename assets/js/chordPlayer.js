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
    chordInstrument: 'chordPlayer1',
    initialize: function(){
        this.sampler = new Tone.Sampler({
        urls: this.chordsUrls,
        release: 1,
        sustain : 10,
        baseUrl: "/assets/instruments/" + this.chordInstrument + "/"
    }).toDestination();},
    startChord: function(notes){
        this.sampler.triggerAttackRelease(notes, 0.5);
    }
}
export default chordPlayer