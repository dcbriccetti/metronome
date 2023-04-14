import AudioLoader from "./AudioLoader"

export interface Listener {
    setTempo: (t: number) => void;
    setStartTime: (t: number) => void
}

export default class MetronomeSound {
    running = false
    private tempoBpm = 60
    private soundNum = 1
    audioContext: AudioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    private soundFiles: AudioLoader
    private source: AudioBufferSourceNode | undefined = undefined
    private nextStart: number = 0

    constructor(private soundsPath: string, sounds: string[], private listener: Listener) {
        const urls = sounds.map(name => this.soundsPath + name)
        this.soundFiles = new AudioLoader(this.audioContext, urls)
    }

    /**
     * Sets the tempo.
     * @param bpm tempo in beats per minute
     */
    setTempo(bpm: number) {
        this.tempoBpm = bpm
    }

    /**
     * Sets the metronome sound.
     * @param number the one-based sound index
     */
    setSound(number: number) {
        this.soundNum = number
    }

    /** Toggles the running state of the metronome */
    toggle(): void {
        this.running = !this.running
        if (this.running) {
            this.startPlaying()
        } else {
            this.stopPlaying()
        }
    }

    private startPlaying() {
        this.nextStart = this.audioContext.currentTime
        this.schedule()
    }

    private stopPlaying() {
        this.listener.setTempo(0)
        if (this.source) {
            this.source.disconnect()
            this.source = undefined
        }
    }

    private schedule(): void {
        if (!this.running) return

        this.listener.setStartTime(this.nextStart)
        this.listener.setTempo(this.tempoBpm)
        const bufIndex = this.soundNum - 1
        if (bufIndex >= this.soundFiles.buffers.length) {
            alert('Sound files are not yet loaded')
        } else if (this.tempoBpm) {
            this.nextStart += 60 / this.tempoBpm
            this.source = this.audioContext.createBufferSource()
            if (this.source) {
                this.source.buffer = this.soundFiles.buffers[bufIndex]
                this.source.connect(this.audioContext.destination)
                this.source.onended = () => this.schedule()
                console.log('starting at', this.nextStart)
                this.source.start(this.nextStart)
            }
        }
    }
}
