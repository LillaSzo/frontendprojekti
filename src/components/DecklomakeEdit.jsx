import { useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import HomeIcon from '@mui/icons-material/Home';

import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';

function DecklomakeEdit({ decks, languages }){

    let { id } = useParams();
    id = Number(id);
    
    let selectedDeck = decks.find((deck) => deck.deck_id === id);

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

    const[deck, setValues] = useState({
    id: id,
    name: selectedDeck.name,
    target_language_id: selectedDeck.target_language_id,
    translation_language_id: selectedDeck.translation_language_id,
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

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
        id: id,
        name: selectedDeck.name,
        target_language_id: selectedDeck.target_language_id,
        translation_language_id: selectedDeck.translation_language_id,
        });
    
    setError('');
    setMessage('');
    };

    //Tulossa Pian//
    const changeDeck = () => {

    const nameErr = getError(deck.name);
        
        if (nameErr) {
        setError(nameErr);
        return;
        }

    setValues({
         id: id,
        name: deck.name,
        target_language_id: 1,
        translation_language_id: 2,
    });
    setMessage('Deck Edited!');
    };

    const getError = (name) => {
    if (!name) return 'Name can not be empty';
    if (name.length < 2 || name.length > 25) return 'Must be between 2-25 characters';
    return '';
    };

    return (
    <Paper sx={{ p: 1, m: 2 }}>

    <Typography variant='h6' sx={{ mb:2 }}>Edit: {selectedDeck.name}</Typography>

    <Box component='form' autoComplete='off' sx={{ '& .MuiTextField-root': { mb: 2 } }}>

        <TextField label='Name' variant='outlined' name='name'
        value={deck.name} onChange={(e) => change(e)} required fullWidth autoFocus error={!!error} helperText={error}/>

        <TextField select label='Target language' name='target_language_id' 
        value={deck.target_language_id} onChange={(e) => change(e)} sx={{ width: '50%' }}>
        {languages.map((language) => (
        <MenuItem key={language.language_id} value={language.language_id}>
            {language.language}
        </MenuItem>
        ))}
        </TextField>

        <TextField select label='Translation language' name='translation_language_id' 
        value={deck.translation_language_id} onChange={(e) => change(e)} sx={{ width: '50%' }}>
        {languages.map((language) => (
        <MenuItem key={language.language_id} value={language.language_id}>
            {language.language}
        </MenuItem>
        ))}
        </TextField>          
            
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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