import { useState } from 'react';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';

import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';

function Wordlista({words, decks}){

  let { id } = useParams();
  id = Number(id);
  let selectedDeck = decks.find(deck => deck.deck_id === id);

  const navigate = useNavigate();

  useEffect(() => {

      if (!selectedDeck) {
      navigate('/error', {
        replace: true,
        state: { errormessage: 'Deck not found' }
        })
        }
    }, [selectedDeck, navigate]);

    if (!selectedDeck) {
        return null;
    }

  const deckWords = words.filter(word => word.deck_id === id);

    useEffect(() => {
        
      if (typeof deckWords === 'undefined' || deckWords.length === 0) {
      navigate('/error', {
          replace: true,
          state: { errormessage: 'You have no words in this deck.' }
          })
        }
    }, [deckWords, navigate]);

  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filterWords = deckWords.filter((word) =>
    word.target_word.toLowerCase().includes(search.toLowerCase())
  );

    return (
      <Box sx={{ m: 2, minWidth: 300 }}>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1}}>
        <TextField variant='outlined'  label='Search' onChange={handleChange}/>

        <Button onClick={() => navigate('/')} variant='contained' sx={{ marginLeft: 'auto' }}  component={Link} to={'/'} startIcon={<HomeIcon />}>Home</Button>    
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: 3,}}>
        <Table>

        <TableHead>
          <TableRow>
            <TableCell>Target word</TableCell>
            <TableCell >Translation</TableCell>
            <TableCell >Sentence</TableCell>
            <TableCell >Difficulty</TableCell>
            <TableCell >Added</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {filterWords.map((word) => (
            <TableRow
              key={word.word_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
              {word.target_word}
              </TableCell>
              <TableCell >{word.translation}</TableCell>
              <TableCell >{word.sentence}</TableCell>
              <TableCell >{word.difficulty}</TableCell>
              <TableCell >{word.added}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
      </TableContainer>

    </Box>
    );
}
export default Wordlista;