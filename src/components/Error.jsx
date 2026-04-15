import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useLocation } from 'react-router';

function Error({ error }) {
    const location = useLocation();

    const errormessage = location.state?.errormessage || error;

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                minHeight: '50vh',
                mt: 5
            }}
        >
            <Typography>{errormessage}</Typography>
        </Box>
    );
}

export default Error;