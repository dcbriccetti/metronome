import React, {useState} from 'react';
import TextField from '@mui/material/TextField';

interface Props {
    tempoBpm: number;
    onChange: (tempo: number) => void;
}

export default function Tempo({tempoBpm, onChange}: Props) {
    const [tempo, setTempo] = useState(tempoBpm);

    function handleChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
        const newTempo = changeEvent.target.valueAsNumber;
        console.log(newTempo);
        setTempo(newTempo);
        onChange(newTempo);
    }

    return (
        <TextField
            fullWidth
            id="tempo"
            label="Tempo, in Beats per Minute"
            type="number"
            value={tempo}
            InputProps={{inputProps: {min: 20, max: 180}}}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
        />
    );
}
