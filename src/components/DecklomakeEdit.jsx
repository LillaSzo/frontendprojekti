import { useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import HomeIcon from '@mui/icons-material/Home';

import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';

import { updateDeck } from './decks';
import { getDeckById } from './decks';

function DecklomakeEdit({  }){

    let { deck_id } = useParams();
    let id = Number(deck_id);
    const navigate = useNavigate();

    const [selectedDeck, setSelectedDeck] = useState(null);

    const [deck, setValues] = useState({
    deck_id: '',
    name: '',
    target_language: '',
    translation_language: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
    const fetchDeck = async () => {
        const response = await getDeckById(id);

        if (response.status !== 200) {
        navigate('/error', {
            replace: true,
            state: { errormessage: 'Deck not found' }
        });
        return;
        }
        setSelectedDeck(response.data);
    };

    fetchDeck();
    }, [id, navigate]);
    

  useEffect(() => {
    if (!selectedDeck) return;

    setValues({
      deck_id: selectedDeck.deck_id,
      name: selectedDeck.name,
      target_language: selectedDeck.target_language,
      translation_language: selectedDeck.translation_language,
    });

  }, [selectedDeck]);


    if (!selectedDeck) {
    return <Typography>Loading...</Typography>;
    }

    const change = (e) => {
    setValues({
        ...deck,
        [e.target.name]: e.target.value
        });
    setError('');
    setMessage('');
    };


    const undoChanges = () => {
        setValues({
        ...deck,
        deck_id: id,
        name: selectedDeck.name,
        target_language: selectedDeck.target_language,
        translation_language: selectedDeck.translation_language,
        });
    
    setError('');
    setMessage('');
    };


const changeDeck = async () => {
  const nameErr = getError(deck.name);
  if (nameErr) {
    setError(nameErr);
    return;
  }

  try {
    const response = await updateDeck(id, {
      name: deck.name,
      target_language: deck.target_language,
      translation_language: deck.translation_language,
    });

    if (response.status !== 200) {
      throw new Error('Failed to update deck');
    }

    setMessage('Deck updated successfully');

  } catch (error) {
    navigate('/error', {
      replace: true,
      state: { errormessage: error.message }
    });
  }
};



    const getError = (name) => {
    if (!name) return 'Name can not be empty';
    if (name.length < 2 || name.length > 25) return 'Must be between 2-25 characters';
    return '';
    };

    let pictureName = '';

    if (deck.picture) {
    pictureName = deck.picture.name;
    }

    return (
    <Paper sx={{ p: 1, m: 2 }}>

    <Typography variant='h6' sx={{ mb:2 }}>Edit: {deck.name}</Typography>

    <Box component='form' autoComplete='off' sx={{ '& .MuiTextField-root': { mb: 2 } }}>

        <TextField label='Name' variant='outlined' name='name'
        value={deck.name} onChange={(e) => change(e)} required fullWidth autoFocus error={!!error} helperText={error}/>

            <FormControl sx={{ width: '50%' }}>
            <InputLabel id="target-language">Target language</InputLabel>
            <Select labelId="target-language" id="target_language" name="target_language" value={deck.target_language} label="Target language" onChange={(e) => change(e)} >
            <MenuItem value={'Finnish'}>Finnish</MenuItem>
            <MenuItem value={'English'}>English</MenuItem>
            <MenuItem value={'Hungarian'}>Hungarian</MenuItem>
            <MenuItem value={'Swedish'}>Swedish</MenuItem>
            </Select>
            </FormControl>

            <FormControl sx={{ width: '50%' }}>
            <InputLabel id="translation-language">Translation language</InputLabel>
            <Select labelId="translation-language" id="translation_language" name="translation_language" value={deck.translation_language} label="Translation language" onChange={(e) => change(e)}>
            <MenuItem value={'Finnish'}>Finnish</MenuItem>
            <MenuItem value={'English'}>English</MenuItem>
            <MenuItem value={'Hungarian'}>Hungarian</MenuItem>
            <MenuItem value={'Swedish'}>Swedish</MenuItem>
            </Select>
            </FormControl> 

        <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => changeDeck()} variant='contained' sx={{ marginRight: 1 }} startIcon={<EditOutlinedIcon />}>Edit</Button>
        <Button onClick={() => undoChanges()} variant='contained' color='secondary' startIcon={<ReplayIcon />}>Undo</Button>
        <Button onClick={() => navigate('/')}  variant='contained' sx={{ marginLeft: 1 }}  component={Link} to={'/'} startIcon={<HomeIcon />}>Home</Button>
        </Box>

    </Box>

    <Typography variant='h6' color='success.main'>{message}</Typography>

    </Paper>
    );
}
export default DecklomakeEdit;