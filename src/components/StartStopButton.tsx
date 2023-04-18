import MetronomeSound from "../metronome-sound"
import {useState} from "react"

interface Props {
    sound: MetronomeSound;
}

export default function StartStopButton({sound}: Props) {
    const [isRunning, setIsRunning] = useState(false)

    function handleClick() {
        sound.toggle()
        setIsRunning(prevIsRunning => !prevIsRunning)
    }

    const buttonLabel = isRunning ? "Stop" : "Start"
    const buttonClasses = `mb-3 btn btn-secondary ${isRunning ? "active" : ""}`

    return (
        <button
            id="metronome"
            className={buttonClasses}
            type="button"
            aria-pressed={isRunning}
            onClick={handleClick}
        >
            {buttonLabel}
        </button>
    )
}
