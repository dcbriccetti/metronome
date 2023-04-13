import MetronomeSound from "../metronome-sound"

interface Props {
    metroSound: MetronomeSound,
    onClick: () => void
}

export default function StartStopButton({metroSound, onClick}: Props) {
    function handleClick() {
        onClick()
        const button = document.querySelector<HTMLInputElement>('#metronome')!
        button.value = metroSound.running ? 'Stop' : 'Start';
    }

    return <input id="metronome" className="form-control btn btn-secondary"
                  type="button" value="Start"
                  onClick={handleClick}
    />
}

