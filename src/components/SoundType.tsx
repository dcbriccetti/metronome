import React, {useState} from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface Props {
    filenames: string[];
    onChange: (index: number) => void;
}

export default function SoundType({filenames, onChange}: Props): JSX.Element {
    const [selectedSoundIndex, setSelectedSoundIndex] = useState<number>(0);

    function handleChange(event: SelectChangeEvent<number>) {
        const index = event.target.value as number; // Cast the value to number
        setSelectedSoundIndex(index);
        onChange(index);
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="sound-type-select-label">Sound</InputLabel>
            <Select
                labelId="sound-type-select-label"
                id="sound-type-select"
                value={selectedSoundIndex}
                label="Sound"
                onChange={handleChange}
            >
                {filenames.map((filename, index) => {
                    const fileExtension = /\..*/;
                    const optionText = filename.replace('_', ' ').replace(fileExtension, '');
                    return (
                        <MenuItem key={filename} value={index}>
                            {optionText}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}
