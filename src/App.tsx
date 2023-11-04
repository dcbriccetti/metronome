import Visualization from './components/Visualization';
import Tempo from './components/Tempo';
import SoundType from './components/SoundType';
import VisualizationType from './components/VisualizationType';
import MetronomeSound from './metronome-sound';
import StartStopButton from './components/StartStopButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";

export default function App(): JSX.Element {
    const soundFilenames = ['High_Woodblock.wav', 'Low_Woodblock.wav', 'High_Bongo.wav', 'Low_Bongo.wav', 'Claves.wav', 'Drumsticks.wav'];
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
            <Typography variant="h3" gutterBottom>Metronome</Typography>
            <Typography variant="subtitle1" gutterBottom>
                By <Link href='https://davebsoft.com'>Dave Briccetti</Link>
                <Link href='https://github.com/dcbriccetti/metronome' sx={{marginLeft: 1}}>Source code</Link>
            </Typography>
            <Grid container spacing={2}>
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
                        <VisualizationType names={['Spinning Circle', 'Circle']}
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
                        getTempoBpm={() => tempoBpm}
                        getStartTime={() => startTime}
                    />}
                </Grid>
            </Grid>
        </Container>
    );
}
