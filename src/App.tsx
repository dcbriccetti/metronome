import Visualization from "./components/Visualization"
import Tempo from './components/Tempo'
import SoundType from "./components/SoundType"
import VisType from "./components/VisType"
import MetronomeSound from "./metronome-sound"
import StartStopButton from "./components/StartStopButton"
import "./App.css"

export default function App(): JSX.Element {
    const soundFilenames = ['High_Woodblock.wav', 'Low_Woodblock.wav', 'High_Bongo.wav',
        'Low_Bongo.wav', 'Claves.wav', 'Drumsticks.wav']
    let startTime = 0
    let tempoBpm = 60
    let visualizationType = 1
    const sound = new MetronomeSound('audio/', soundFilenames, {
        setTempo:     (t: number) => tempoBpm = t,
        setStartTime: (s: number) => startTime = s
    })

    return <div className="container">
        <h1>Metronome</h1>
        <p className='byline'>By <a href="https://davebsoft.com">Dave Briccetti</a>
            <a className='source-link' href="https://github.com/dcbriccetti/metronome">Source code</a></p>
        <div className="row">
            <div className="col-sm">
                <Tempo tempoBpm={tempoBpm}
                       onChange={(t: number) => {
                           tempoBpm = t
                           sound.setTempo(t)
                       }}/>
                <SoundType filenames={soundFilenames}
                           onChange={index => sound.setSound(index + 1)}/>
                <VisType names={['Spinning Circle', 'Circle']}
                         onChange={(index: number) => visualizationType = index}/>
                <StartStopButton sound={sound} />
            </div>
            <div className="col-sm" id="visualization">
                <Visualization getTime={() => sound.audioContext.currentTime}
                               getTempoBpm={() => tempoBpm}
                               getStartTime={() => startTime}
                               getVisualizationType={() => visualizationType}/>
            </div>
        </div>
    </div>
}
