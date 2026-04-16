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
                mt: 5
            }}
        >
            <Typography variant='h5'>{errormessage}</Typography>
        </Box>
    );
}

export default Error;