import "/scripts/tone/build/Tone.js";
var musicPlayer = {
    scales: {
        major: [0, 2, 4, 5, 7, 9, 11, 12],
        minor: [0, 2, 3, 5, 7, 8, 10, 12]
    },
    notes: ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab"],
    chordPlayer: null,
    chordInstrument: 'chordPlayer1',
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
    initialize() {
        this.initializeTone();
    },
    initializeTone: function () {
        this.chordPlayer = new Tone.Sampler({
            urls: this.chordsUrls,
            release: 1,
            baseUrl: "/assets/instruments/" + this.chordInstrument + "/"
        }).toDestination();
        Tone.loaded().then(() => {
            this.start();
        });
    },
    start() {
        Tone.context.resume();
        Tone.start();
    },
    getScale(note, scale = 'major') {
        var scale = this.scales.major;
        var transposed_notes = [];
        for (var i = 0; i < 7; i++) {
            transposed_notes.push(this.notes[(note + scale[i]) % 12]);
        }
        return transposed_notes;
    },
    getNoteId(note) {
        var note_names = {
            "A": 0,
            "A#": 1,
            "Bb": 1,
            "B": 2,
            "C": 3,
            "C#": 4,
            "Db": 4,
            "D": 5,
            "D#": 6,
            "Eb": 6,
            "E": 7,
            "F": 8,
            "F#": 9,
            "Gb": 9,
            "G": 10,
            "G#": 11,
            "Ab": 11
        };

        if (Object.keys(note_names).includes(note)) {
            return note_names[note];
        }
        return null;
    },
    parseChord(chord) {
        var chordDetails = {
            scale: 'major',
            note: 'A'
        };
        if (chord.includes('m')) {
            chordDetails.scale = this.scales.minor;
            chord = chord.replace('m', '');
        }
        chordDetails.note = this.getNoteId(chord);
        return chordDetails;
    },
    playChord(chord) {
        var chordDetails = this.parseChord(chord);
        var octave = 2;
        var transposedScale = this.getScale(chordDetails.note, chordDetails.scale, octave);
        var tonic = transposedScale[0] + octave;
        var supertonic = transposedScale[1] + octave;
        var mediant = transposedScale[2] + octave;
        var subdominant = transposedScale[3] + octave;
        var dominant = transposedScale[4] + octave;
        var submediant = transposedScale[5] + octave;
        var leadingTone = transposedScale[6] + octave;

        var notes = [tonic, mediant, dominant];
        this.chordPlayer.triggerAttackRelease(notes, 0.5);
    }
}
export default musicPlayer