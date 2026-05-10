import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Deck from './Deck';
import { Typography } from '@mui/material';

import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import { getDecks } from './decks';

function Decklista( ){

  const navigate = useNavigate();

  const [decks, setDecks] = useState([]);
  const [message, setMessage] = useState('Searching');

  const fetchData = async () => {
    try {
      const response = await getDecks();

      if (response.status !== 200) {
        throw new Error('Failed to search decks');
      }

      if (response.data.length === 0) {
        throw new Error('No decks to load');
      }

      setDecks(response.data);
      setMessage('');

    } catch (error) {

      navigate('/error', {
        replace: true,
        state: { errormessage: error.message }
      });
    }
  }
  useEffect(() => { fetchData() }, []);

  if (message.length > 0) {
    return (<Typography>{message}</Typography>)
  }
    
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