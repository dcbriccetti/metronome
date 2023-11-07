import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface Props {
    names: string[];
    visualizationType: number;
    setVisualizationType: (index: number) => void;
}

export default function VisualizationType({names, visualizationType, setVisualizationType}: Props) {

    function handleChange(event: SelectChangeEvent) {
        const index = parseInt(event.target.value, 10);
        setVisualizationType(index);
    }

    return (
        <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="visType-label">Visualization</InputLabel>
            <Select
                labelId="visType-label"
                id="visType"
                value={String(visualizationType)}
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
