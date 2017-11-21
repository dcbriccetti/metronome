class MetronomeApp {
    /**
     * Creates a MetronomeApp.
     * @param soundsPath the path used to fetch the sound files
     * @param sounds an array of sound file names
     * @param visSettings settings for the visualizer
     * @param soundSelectId the ID of the HTML select control for the sounds
     * @param startStopId the ID of the HTML button to start and stop the metronome
     */
    constructor(soundsPath, sounds, visSettings, soundSelectId, startStopId) {
        this.soundSelectElementId = soundSelectId || 'metroSound';
        this.startStopId = startStopId || 'metronome';

        const metroSoundEventHandler = {
            setTempo: (t) => visSettings.tempoBpm = t,
            setStartTime: (t) => visSettings.startTime = t
        };
        this.metroSound = new MetronomeSound(soundsPath, sounds, metroSoundEventHandler);

        visSettings.getTime = () => this.metroSound.audioContext.currentTime;

        const soundSelect = $('#' + this.soundSelectElementId);
        for (name of sounds) {
            const fileExtension = /\..*/;
            const optionText = name.replace('_', ' ').replace(fileExtension, '');
            soundSelect.append(`<option>${optionText}</option>`);
        }
    }

    /**
     * Sets the tempo.
     * @param tempo in beats per minute
     */
    setTempo(tempo) {
        this.metroSound.setTempo(tempo);
    }

    /**
     * Sets the metronome sound.
     * @param sound the one-based sound index
     */
    setSound(sound) {
        this.metroSound.setSound(sound);
    }

    /** Starts the metronome if it is stopped, and vice versa. */
    toggle() {
        this.metroSound.toggle();
        $('#' + this.startStopId).val(this.metroSound.running ? 'Stop' : 'Start')
    }
}

const metronomeApp = new MetronomeApp('assets/audio/',
    ['High_Woodblock.wav', 'Low_Woodblock.wav', 'High_Bongo.wav',
        'Low_Bongo.wav', 'Claves.wav', 'Drumsticks.wav'],
    VisSettings);
