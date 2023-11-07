import {Box, Container, Grid} from '@mui/material';
import Header from './components/Header';
import Tempo from './components/Tempo';
import SoundType from './components/SoundType';
import VisualizationType from './components/VisualizationType';
import Visualization, {visualizationNames} from './components/Visualization';
import StartStopButton from './components/StartStopButton';
import MetronomeSound from './metronome-sound';
import {useEffect, useState} from "react";
import {loadSetting, saveSetting} from "./storage";

export default function App() {
    const soundFilenames = [
        'High_Woodblock.wav',
        'Low_Woodblock.wav',
        'High_Bongo.wav',
        'Low_Bongo.wav',
        'Claves.wav',
        'Drumsticks.wav'];
    const [startTime, setStartTime] = useState(0);
    const [visualizationType, setVisualizationType] =
        useState<number>(loadSetting<number>('visualizationType', 0));
    const [isRunning, setIsRunning] = useState(false);
    const [tempoBpm, setTempoBpm] = useState<number>(loadSetting<number>('tempoBpm', 60));
    const [sound, setSound] = useState<MetronomeSound | null>(null);
    const [soundIndex, setSoundIndex] = useState<number>(loadSetting<number>('soundIndex', 0));

    useEffect(() => {
        saveSetting<number>('tempoBpm', tempoBpm);
    }, [tempoBpm]);

    useEffect(() => {
        saveSetting<number>('visualizationType', visualizationType);
    }, [visualizationType]);

    useEffect(() => {
        saveSetting<number>('soundIndex', soundIndex);
    }, [soundIndex]);

    useEffect(() => {
        const newSound = new MetronomeSound('audio/', soundFilenames, setStartTime);
        newSound.setTempo(tempoBpm);
        setSound(newSound);

        return () => newSound.dispose();
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
                        <SoundType filenames={soundFilenames} selectedIndex={soundIndex} onChange={index => {
                            setSoundIndex(index);
                            sound?.setSound(index + 1);
                        }}/>
                    </Box>
                    <Box>
                        <VisualizationType names={visualizationNames()}
                                           visualizationType={visualizationType}
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
