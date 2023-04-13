import MetronomeSound from "./metronome-sound"
import {VisSettings} from "./visualization"

export default class MetronomeApp {
    /**
     * Creates a MetronomeApp.
     * @param metroSound a MetronomeSound object
     * @param visSettings settings for the visualizer
     */
    constructor(private metroSound: MetronomeSound,
                private visSettings: VisSettings) {
    }

    /**
     * Sets the tempo.
     * @param bpm tempo in beats per minute
     */
    setTempo(bpm: number) {
        this.metroSound.setTempo(bpm);
    }

    /**
     * Sets the metronome sound.
     * @param number the one-based sound index
     */
    setSound(number: number) {
        this.metroSound.setSound(number);
    }

    /**
     * Sets the visualization type.
     * @param index a 0-based number specifying the visualization to use
     */
    setVisualization(index: number) {
        this.visSettings.visualizationType = index;
    }

    /** Starts the metronome if it is stopped, and vice versa. */
    toggle() {
      this.metroSound.toggle();
    }
}
