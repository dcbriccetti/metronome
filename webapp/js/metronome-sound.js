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

    /**
     * Sets the tempo.
     * @param bpm tempo in beats per minute
     */
    setTempo(bpm) {
        this.tempoBpm = bpm;
    }

    /**
     * Sets the metronome sound.
     * @param number the one-based sound index
     */
    setSound(number) {
        this.soundNum = number;
    }

    /** Toggles the running state of the metronome */
    toggle() {
        const ms = this;

        function playMetronome() {
            let nextStart = ms.audioContext.currentTime;

            function schedule() {
                if (!ms.running) return;

                ms.listener.setStartTime(nextStart);
                ms.listener.setTempo(ms.tempoBpm);
                const bufIndex = ms.soundNum - 1;
                if (bufIndex >= ms.soundFiles.buffers.length) {
                    alert('Sound files are not yet loaded')
                } else if (ms.tempoBpm) {
                    nextStart += 60 / ms.tempoBpm;
                    ms.source = ms.audioContext.createBufferSource();
                    ms.source.buffer = ms.soundFiles.buffers[bufIndex];
                    ms.source.connect(ms.audioContext.destination);
                    ms.source.onended = schedule;
                    ms.source.start(nextStart);
                }
            }

            schedule();
        }

        if (this.running = !this.running) {
            playMetronome();
        } else {
            this.listener.setTempo(0);
            if (this.source) {
                this.source.disconnect();
                this.source = undefined;
            }
        }
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
