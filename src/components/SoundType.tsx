import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface Props {
    filenames: string[];
    selectedIndex: number;
    onChange: (index: number) => void;
}

export default function SoundType({filenames, selectedIndex, onChange}: Props) {
    function handleChange(event: SelectChangeEvent<number>) {
        const index = event.target.value as number;
        onChange(index);
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="sound-type-select-label">Sound</InputLabel>
            <Select
                labelId="sound-type-select-label"
                id="sound-type-select"
                value={selectedIndex}
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
