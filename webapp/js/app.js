const metronome = new Metronome('assets/audio/');
SketchSettings.getTime = () => metronome.audioContext.currentTime;
metronome.loadMetronomeSounds(['High_Woodblock.wav', 'Low_Woodblock.wav', 'High_Bongo.wav',
    'Low_Bongo.wav', 'Claves.wav', 'Drumsticks.wav']);

function toggle() {
    metronome.toggle();
    $("#metronome").val(metronome.running ? 'Stop' : 'Start')
}
