import React, {useState} from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface Props {
    tempoBpm: number;
    onChange: (tempo: number) => void;
}

export default function Tempo({tempoBpm, onChange}: Props) {
    const [tempo, setTempo] = useState(tempoBpm);

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setTempo(newValue);
            onChange(newValue);
        }
    };

    return (
        <Box width="20em">
            <Typography id="input-slider" gutterBottom>
                Tempo: {tempo} BPM
            </Typography>
            <Slider
                aria-labelledby="input-slider"
                value={tempo}
                onChange={handleSliderChange}
                min={30}
                max={220}
            />
        </Box>
    );
}
