import ToggleButton from '@mui/material/ToggleButton';

interface Props {
    isRunning: boolean;
    setIsRunning: (is: boolean) => void;
}

export default function StartStopButton({isRunning, setIsRunning}: Props) {
    return (
        <ToggleButton
            value=""
            selected={isRunning}
            onChange={() => setIsRunning(!isRunning)}
            color="primary"
        >
            {isRunning ? 'Stop' : 'Start'}
        </ToggleButton>
    );
}
