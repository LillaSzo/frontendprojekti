import { useState } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';

function Wordtable({ words, decks }){

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

  const filteredWords = deckWords.filter((word) =>
    word.target_word.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    { field: 'target_word', headerName: 'Target Word', flex: 1 },
    { field: 'translation', headerName: 'Translation', flex: 1 },
    { field: 'sentence', headerName: 'Sentence', flex: 2 },
    { field: 'difficulty', headerName: 'Difficulty', flex: 1, sortable: false},
    { field: 'pos', headerName: 'POS', flex: 1 },
    { field: 'added', headerName: 'Added', flex: 1 },
    {field: 'favourite', headerName: 'Favourite', flex: 1, sortable: false,
        renderCell: (params) =>
          params.value ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )
      }
    ];
  const rows = filteredWords.map(word => ({
      id: word.word_id,
      ...word
  }));

    return (
      <Box sx={{ m: 2, minWidth: 300 }}>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1}}>
        <TextField variant='outlined'  label='Search' onChange={handleChange}/>

        <Button onClick={() => navigate('/')} variant='contained' sx={{ marginLeft: 'auto' }}  component={Link} to={'/'} startIcon={<HomeIcon />}>Home</Button>    
        </Box>
      
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
          initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } }
          }}
        />
    </Box>
    );
  }
export default Wordtable;