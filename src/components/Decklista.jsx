import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Deck from './Deck';

function Decklista({decks}){

    if(decks.length === 0) {
        return (<p>Deck not found</p>)
    }
    
    return(
    <Box sx={{
    p: 2,
    minWidth: 300,
    }}>
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