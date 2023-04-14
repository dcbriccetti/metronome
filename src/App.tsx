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
    };

    const soundFilenames = ['High_Woodblock.wav', 'Low_Woodblock.wav', 'High_Bongo.wav',
        'Low_Bongo.wav', 'Claves.wav', 'Drumsticks.wav']
    const metroSoundListener: Listener = {
        setTempo: (tempo: number) => visSettings.tempoBpm = tempo,
        setStartTime: (startTime: number) => visSettings.startTime = startTime
    };
    const sound = new MetronomeSound('audio/', soundFilenames, metroSoundListener);

    return <div className="container">
        <h1>Metronome</h1>
        <p className='byline'>By <a href="https://davebsoft.com">Dave Briccetti</a>
            <a className='source-link' href="https://github.com/dcbriccetti/metronome">Source code</a></p>
        <div className="row">
            <div className="col-sm">
                <Tempo tempoBpm={visSettings.tempoBpm}
                       onChange={tempo => sound.setTempo(tempo)}/>
                <SoundType filenames={soundFilenames}
                           onChange={index => sound.setSound(index + 1)}/>
                <VisType names={['Spinning Circle', 'Circle']}
                         onChange={(index: number) => visSettings.visualizationType = index}/>
                <StartStopButton metroSound={sound} onClick={() => sound.toggle()}/>
            </div>
            <div className="col-sm" id='visualization'>
                <Visualization getTime={() => sound.audioContext.currentTime} visSettings={visSettings}/>
            </div>
        </div>
    </div>
}
