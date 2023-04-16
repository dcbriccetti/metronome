import MetronomeSound from "../metronome-sound"
import {useState} from "react"

interface Props {
    sound: MetronomeSound,
}

export default function StartStopButton({sound}: Props) {
    const [label, setLabel] = useState('Start')

    function handleClick() {
        sound.toggle()
        setLabel(sound.running ? 'Stop' : 'Start');
    }

    return <input id="metronome" className="form-control btn btn-secondary"
                  type="button" value={label}
                  onClick={handleClick}
    />
}

