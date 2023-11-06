import Header from './components/Header';
import Tempo from './components/Tempo';
import SoundType from './components/SoundType';
import VisualizationType from './components/VisualizationType';
import Visualization, {visualizationNames} from './components/Visualization';
import StartStopButton from './components/StartStopButton';
import MetronomeSound from './metronome-sound';
import {Box, Container, Grid} from '@mui/material';
import {useEffect, useState} from "react";

export default function App() {
    const soundFilenames = [
        'High_Woodblock.wav',
        'Low_Woodblock.wav',
        'High_Bongo.wav',
        'Low_Bongo.wav',
        'Claves.wav',
        'Drumsticks.wav'];
    const [startTime, setStartTime] = useState(0);
    const [visualizationType, setVisualizationType] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [tempoBpm, setTempoBpm] = useState(60);
    const [sound, setSound] = useState<MetronomeSound | null>(null);

    useEffect(() => {
        const newSound = new MetronomeSound('audio/', soundFilenames, setStartTime);
        setSound(newSound);

        return () => newSound.setIsRunning(false);
    }, []);

    return (
        <Container>
            <Header/>
            <Grid container spacing={2} mt="5px">
                <Grid item xs="auto">
                    <Box mb={1}>
                        <Tempo tempoBpm={tempoBpm} onChange={(tempoBpm: number) => {
                            setTempoBpm(tempoBpm);
                            sound?.setTempo(tempoBpm);
                        }}/>
                    </Box>
                    <Box>
                        <SoundType filenames={soundFilenames} onChange={index => sound?.setSound(index + 1)}/>
                    </Box>
                    <Box>
                        <VisualizationType names={visualizationNames()}
                                           setVisualizationType={setVisualizationType}/>
                    </Box>

                    <Box mb={1}>
                        <StartStopButton isRunning={isRunning} setIsRunning={(isRunning: boolean) => {
                            sound?.setIsRunning(isRunning);
                            setIsRunning(isRunning);
                        }}/>
                    </Box>
                </Grid>
                <Grid item xs id='visualization'>
                    {sound && <Visualization
                        running={isRunning}
                        visualizationType={visualizationType}
                        getTime={() => sound.audioContext.currentTime}
                        tempoBpm={tempoBpm}
                        startTime={startTime}
                    />}
                </Grid>
            </Grid>
        </Container>
    );
}
