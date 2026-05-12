import { useState } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';

import { getWordsByDeck } from './decks';
import { deleteWord } from './decks';

function Wordtable(){

  let { id } = useParams();
  let deck_id = Number( id );
  const navigate = useNavigate();

  const [selectedWords, setSelectedWords] = useState([]);
  const [message, setMessage] = useState('Searching');
  const [search, setSearch] = useState('');

   const fetchData = async () => {
    try {
      const response = await getWordsByDeck(deck_id);

      if (response.status !== 200) {
        throw new Error('Failed to load words');
      }

      if (response.data.length === 0) {
        throw new Error('No words to load');
      }

      setSelectedWords(response.data);
      setMessage('');

    } catch (error) {

      navigate('/error', {
        replace: true,
        state: { errormessage: error.message }
      });
    }
  }
  useEffect(() => { fetchData() }, [deck_id, navigate]);

  if (message.length > 0) {
    return (<Typography>{message}</Typography>)
  }
   
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredWords = selectedWords.filter((word) =>
    word.target_word.toLowerCase().includes(search.toLowerCase())
  )

  const handleDeleteWord = async (id) => {
    try {
      const response = await deleteWord(id);
      if (response.status !== 200) {
        throw new Error('Failed to delete word');
      }
  
    setSelectedWords(previous => previous.filter(word => word.word_id !== id));
  
    } catch (error) {
      navigate('/error', {
        replace: true,
        state: { errormessage: error.message }
      });
    }
    }; 

  const columns = [
    { field: 'target_word', headerName: 'Target Word', flex: 1 },
    { field: 'translation', headerName: 'Translation', sortable: false, flex: 1 },
    { field: 'sentence', headerName: 'Sentence', sortable: false, flex: 2 },
    { field: 'difficulty', headerName: 'Difficulty', flex: 1, sortable: false},
    { field: 'pos', headerName: 'POS', flex: 1,sortable: false },
    { field: 'added', headerName: 'Added', flex: 1,
    valueGetter: (value) => new Date(value),
    valueFormatter: (value) =>value.toLocaleDateString('fi-FI')},
    {field: 'favourite', headerName: 'Favourite', flex: 1, sortable: false,
    renderCell: (params) => params.value ? (
    <IconButton><FavoriteIcon /></IconButton>) 
    : 
    (<IconButton><FavoriteBorderIcon /></IconButton>)},
    {field: 'delete', headerName: 'Delete', flex:1, sortable: false,
    renderCell: (params) => (
    <IconButton><ClearIcon onClick={() => handleDeleteWord(params.row.word_id)}/></IconButton>
    )
    }
    ];

  const rows = filteredWords.map(word => ({
      id: word.word_id,
      ...word,
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