import {Box, Link, Typography} from "@mui/material";

export default function Header() {
    return (
        <Box display="flex" alignItems="baseline" flexWrap="wrap" gap={2}>
            <Typography variant="h3" component="div">
                Metronome
            </Typography>
            <Typography variant="subtitle2" component="span">
                By <Link href='https://davebsoft.com'>Dave Briccetti</Link>
            </Typography>
            <Typography variant="subtitle2" component="span">
                <Link href='https://github.com/dcbriccetti/metronome'>Source code</Link>
            </Typography>
        </Box>
    );
}
