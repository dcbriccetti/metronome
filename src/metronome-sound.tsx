import AudioLoader from './AudioLoader'

export default class MetronomeSound {
    private running = false
    private tempoBpm = 60
    private soundNum = 1
    public audioContext: AudioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    private soundFiles: AudioLoader
    private source?: AudioBufferSourceNode
    private nextStart: number = 0
    private soundsPath: string
    private setStartTime: (t: number) => void

    constructor(soundsPath: string, sounds: string[], setStartTime: (t: number) => void) {
        this.soundsPath = soundsPath;
        this.setStartTime = setStartTime;
        const urls = sounds.map(name => soundsPath + name)
        this.soundFiles = new AudioLoader(this.audioContext, urls)
    }

    /**
     * Sets the tempo.
     * @param bpm tempo in beats per minute
     */
    setTempo(bpm: number): void {
        this.tempoBpm = bpm
    }

    /**
     * Sets the metronome sound.
     * @param number the one-based sound index
     */
    setSound(number: number): void {
        this.soundNum = number
    }

    /** Toggles the running state of the metronome */
    setIsRunning(running: boolean): void {
        this.running = running
        if (this.running) {
            this.startPlaying()
        } else {
            this.stopPlaying()
        }
    }

    private startPlaying(): void {
        this.nextStart = this.audioContext.currentTime
        this.schedule()
    }

    private stopPlaying(): void {
        if (this.source) {
            this.source.disconnect()
            this.source = undefined
        }
    }

    private schedule(): void {
        if (!this.running) return

        this.setStartTime(this.nextStart)
        const bufIndex = this.soundNum - 1
        if (! this.soundFiles.isLoaded()) {
            console.error('Sound files are not yet loaded')
            return;
        }

        if (this.tempoBpm) {
            const interval = 60 / this.tempoBpm
            this.nextStart += interval
            this.source = this.audioContext.createBufferSource()
            this.source.buffer = this.soundFiles.getBuffers()[bufIndex]
            this.source.connect(this.audioContext.destination)
            this.source.onended = () => this.schedule()
            this.source.start(this.nextStart)
        }
    }

    dispose(): void {
        this.setIsRunning(false);
        if (this.source) {
            this.source.disconnect()
        }
        this.audioContext.close()
    }
}
