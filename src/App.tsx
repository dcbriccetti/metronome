import MetronomeApp from "./metronome-app"
import {VisSettings} from "./visualization"
import Tempo from './components/Tempo'
import SoundType from "./components/SoundType"
import VisType from "./components/VisType"
import Vis from "./components/Vis"
import MetronomeSound, {Listener} from "./metronome-sound"
import StartStopButton from "./components/StartStopButton"

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
    const metronomeApp = new MetronomeApp(metroSound, visSettings);

    return <div className="container">
        <h1>Metronome</h1>
        <p style={{fontSize: '70%'}}>By <a href="https://davebsoft.com">Dave Briccetti</a>
            <a style={{marginLeft: '1em'}} href="https://github.com/dcbriccetti/metronome">Source code</a></p>
        <div className="row">
            <div className="col-sm">
                <Tempo tempoBpm={visSettings.tempoBpm}
                       onChange={tempo => metronomeApp.setTempo(tempo)}/>
                <SoundType filenames={soundFilenames}
                           onChange={index => metronomeApp.setSound(index + 1)}/>
                <VisType names={visSettings.names}
                         onChange={(index: number) => metronomeApp.setVisualization(index)}/>
                <StartStopButton metroSound={metroSound} onClick={() => metronomeApp.toggle()}/>
            </div>
            <Vis getTime={() => metroSound.audioContext.currentTime} visSettings={visSettings}/>
        </div>
    </div>
}
