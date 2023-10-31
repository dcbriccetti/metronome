import ToggleButton from '@mui/material/ToggleButton';

interface Props {
    isRunning: boolean;
    setIsRunning: (is: boolean) => void;
}

export default function StartStopButton({isRunning, setIsRunning}: Props) {

    function handleClick() {
        setIsRunning(!isRunning);
    }

    return (
        <ToggleButton
            value="check"
            selected={isRunning}
            onChange={handleClick}
            color="primary"
        >
            {isRunning ? 'Stop' : 'Start'}
        </ToggleButton>
    );
}
