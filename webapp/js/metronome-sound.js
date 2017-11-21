class MetronomeSound {
    constructor(soundsPath, sounds, listener) {
        this.soundsPath = soundsPath;
        const dummyListener = { setTempo: (t) => {}, setStartTime: (t) => {} };
        this.listener = listener || dummyListener;
        this.running = false;
        this.tempoBpm = 60;
        this.soundNum = 1;
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const urls = sounds.map(name => this.soundsPath + name);
        this.soundFiles = new SoundFiles(this.audioContext, urls);
    }

    setTempo(bpm) {
        this.tempoBpm = bpm;
    }

    setSound(number) {
        this.soundNum = number;
    }

    toggle() {
        if (this.running = !this.running) {
            this.playMetronome();
        } else {
            this.listener.setTempo(0);
            if (this.source) {
                this.source.disconnect();
                this.source = undefined;
            }
        }
    }

    playMetronome() {
        const metronome = this;
        let nextStart = this.audioContext.currentTime;

        function schedule() {
            if (!metronome.running) return;

            metronome.listener.setStartTime(nextStart);
            metronome.listener.setTempo(metronome.tempoBpm);
            const bufIndex = metronome.soundNum - 1;
            if (bufIndex >= metronome.soundFiles.buffers.length) {
                alert('Sound files are not yet loaded')
            } else {
                const bps = metronome.tempoBpm === 0 ? 1 : metronome.tempoBpm / 60.0;
                nextStart += 1 / bps;
                const source = metronome.source = metronome.audioContext.createBufferSource();
                source.buffer = metronome.soundFiles.buffers[bufIndex];
                source.connect(metronome.audioContext.destination);
                source.onended = schedule;
                source.start(nextStart);
            }
        }

        schedule();
    }
}

class SoundFiles {
    constructor(context, urlList) {
        this.buffers = [];
        const self = this;

        urlList.forEach((url, index) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = "arraybuffer";
            xhr.onload = () => context.decodeAudioData(xhr.response,
                (buffer) => self.buffers[index] = buffer,
                (error) => console.error('decodeAudioData error', error));
            xhr.open("GET", url);
            xhr.send();
        });
    }
}
