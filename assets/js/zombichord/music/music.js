import "/scripts/tone/build/Tone.js";
import chordPlayer from '/assets/js/zombichord/music/chordPlayer.js';
import harpPlayer from '/assets/js/zombichord/music/harpPlayer.js';

var musicPlayer = {
    scales: {
        major: [0, 2, 4, 5, 7, 9, 11, 12],
        minor: [0, 2, 3, 5, 7, 8, 10, 12]
    },
    notes: ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab"],
    chordPlayer: null,
    harpPlayer: null,
    currentChord : {
        name: '',
        notes: []
    },
    initialize() {
        this.initializeTone();
    },
    initializeTone(){
        this.chordPlayer = chordPlayer;
        this.chordPlayer.initialize();

        this.harpPlayer = harpPlayer;
        this.harpPlayer.initialize();

        Tone.loaded().then(() => {
            this.start();
        });
    },
    start() {
        Tone.context.resume();
        Tone.start();
    },
    getScale(note, scale = this.scales.major) {
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
            scale:  this.scales.major,
            note: 'A'
        };
        if (chord.includes('m')) {
            chordDetails.scale = this.scales.minor;
            chord = chord.replace('m', '');
        }
        chordDetails.note = this.getNoteId(chord);
        return chordDetails;
    },
    getChordNotes(chord){
        var chordDetails = this.parseChord(chord);
        var octave = 3;
        var transposedScale = this.getScale(chordDetails.note, chordDetails.scale, octave);
        var tonic = transposedScale[0] + octave;
        var supertonic = transposedScale[1] + octave;
        var mediant = transposedScale[2] + octave;
        var subdominant = transposedScale[3] + octave;
        var dominant = transposedScale[4] + octave;
        var submediant = transposedScale[5] + octave;
        var leadingTone = transposedScale[6] + octave;
        var notes = [tonic, mediant, dominant];
        return notes
    },
    startChord(chord) {
        this.chordPlayer.stopChord(this.currentChord.notes);
        this.currentChord.name = chord;
        this.currentChord.notes = this.getChordNotes(this.currentChord.name);
        this.chordPlayer.startChord(this.currentChord.notes);
    },
    stopChord(chord){ 
        if(chord == this.currentChord.name){
            this.chordPlayer.stopChord(this.currentChord.notes);
        }
    },
    playHarp(note){
        if(this.currentChord.notes.length > 0){ // only play of there is a chord activated
            var octave = Math.floor(note / 12) + 1; // finding octave according to note number
            var note = note % 12; // finding note position on octave
            note = Math.floor(note * this.currentChord.notes.length / 12); // keeping only x possibilities
            // applying transformation according to current chord
            note = this.currentChord.notes[note];
            note = this.changeOctave(note, octave);
            this.harpPlayer.play(note);
        }
    },
    changeOctave(note, octave){
        return note.slice(0,-1)+octave;
    }
}
export default musicPlayer