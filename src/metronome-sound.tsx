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
        const ms = this

        function playMetronome() {
            let nextStart: number = ms.audioContext.currentTime

            function schedule(): void {
                if (!ms.running) return

                ms.listener.setStartTime(nextStart)
                ms.listener.setTempo(ms.tempoBpm)
                const bufIndex = ms.soundNum - 1
                if (bufIndex >= ms.soundFiles.buffers.length) {
                    alert('Sound files are not yet loaded')
                } else if (ms.tempoBpm) {
                    nextStart += 60 / ms.tempoBpm
                    ms.source = ms.audioContext.createBufferSource()
                    if (ms.source) {
                        ms.source.buffer = ms.soundFiles.buffers[bufIndex]
                        ms.source.connect(ms.audioContext.destination)
                        ms.source.onended = schedule
                        ms.source.start(nextStart)
                    }
                }
            }

            schedule()
        }

        this.running = !this.running
        if (this.running) {
            playMetronome()
        } else {
            this.listener.setTempo(0)
            if (this.source) {
                this.source.disconnect()
                this.source = undefined
            }
        }
    }
}
