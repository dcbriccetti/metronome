import {VisSettings, Visualization} from "./components/Visualization"
import Tempo from './components/Tempo'
import SoundType from "./components/SoundType"
import VisType from "./components/VisType"
import MetronomeSound, {Listener} from "./metronome-sound"
import StartStopButton from "./components/StartStopButton"
import "./App.css"

export default function App(): JSX.Element {
    const visSettings: VisSettings = {
        tempoBpm: 60,
        startTime: 0,
        visualizationType: 1,
        names: ['Spinning Circle', 'Circle']
    };

    const soundFilenames = ['High_Woodblock.wav', 'Low_Woodblock.wav', 'High_Bongo.wav',
        'Low_Bongo.wav', 'Claves.wav', 'Drumsticks.wav']
    const metroSoundListener: Listener = {
        setTempo: (tempo: number) => visSettings.tempoBpm = tempo,
        setStartTime: (startTime: number) => visSettings.startTime = startTime
    };
    const metroSound = new MetronomeSound('audio/', soundFilenames, metroSoundListener);

    return <div className="container">
        <h1>Metronome</h1>
        <p className='byline'>By <a href="https://davebsoft.com">Dave Briccetti</a>
            <a className='source-link' href="https://github.com/dcbriccetti/metronome">Source code</a></p>
        <div className="row">
            <div className="col-sm">
                <Tempo tempoBpm={visSettings.tempoBpm}
                       onChange={tempo => metroSound.setTempo(tempo)}/>
                <SoundType filenames={soundFilenames}
                           onChange={index => metroSound.setSound(index + 1)}/>
                <VisType names={visSettings.names}
                         onChange={(index: number) => visSettings.visualizationType = index}/>
                <StartStopButton metroSound={metroSound} onClick={() => metroSound.toggle()}/>
            </div>
            <div className="col-sm" id='visualization'>
                <Visualization getTime={() => metroSound.audioContext.currentTime} visSettings={visSettings}/>
            </div>
        </div>
    </div>
}
