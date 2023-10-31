import React, {useState} from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface Props {
    names: string[];
    setVisualizationType: (index: number) => void;
}

export default function VisualizationType({names, setVisualizationType}: Props) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    function handleChange(event: SelectChangeEvent) {
        const index = parseInt(event.target.value, 10);
        setSelectedIndex(index);
        setVisualizationType(index);
    }

    return (
        <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="visType-label">Visualization</InputLabel>
            <Select
                labelId="visType-label"
                id="visType"
                value={String(selectedIndex)}
                label="Visualization"
                onChange={handleChange}
            >
                {names.map((visTypeName, index) => (
                    <MenuItem key={visTypeName} value={String(index)}>
                        {visTypeName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
