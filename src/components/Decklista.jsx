import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


import Deck from './Deck';
import { Typography } from '@mui/material';

import { useNavigate } from 'react-router';
import { useEffect } from 'react';

function Decklista({decks}){

  const navigate = useNavigate();

    useEffect(() => {
        
        if (typeof decks === 'undefined' || decks.length === 0) {
        navigate('/error', {
            replace: true,
            state: { errormessage: 'You have no decks.' }
        })
        }
    }, [decks, navigate]);
    
    return(
    <Box sx={{ p: 2, minWidth: 300, }}>
        
        <Typography variant='h4' align='center'>Own Decks</Typography>

        <Grid container spacing={3} sx={{ mt:2 }}>
            {
            decks.map((deck) => { 
            return (
            <Grid key={deck.deck_id}>
            <Deck deck={deck}/>
            </Grid>
                );        
            })
            }   
        </Grid>

    </Box>
    );
}
export default Decklista;