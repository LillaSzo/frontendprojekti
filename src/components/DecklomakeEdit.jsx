import { useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ClearIcon from '@mui/icons-material/Clear';

import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function DecklomakeEdit({decks, languages}){

    let { id } = useParams();

    id = Number(id);
    const constDeck = decks.find((deck) => deck.deck_id === id);
    let selected = decks.find((deck) => deck.deck_id === id);

    const navigate = useNavigate();


    useEffect(() => {
        if (!selected) {
        navigate('/error', {
            replace: true,
            state: { errormessage: 'Deck not found' }
        })
        }
    }, [selected, navigate]);

    if (!selected) {
        return null;
    }

    const[deck, setValues] = useState({
    id: id,
    name: selected.name,
    target_language: selected.target_language,
    translation_language: selected.translation_language,
    picture: []
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


    const clearFields = () => {
        setValues({
        ...deck,
        name: '',
        target_language: '',
        translation_language: '',
        picture: []
        });
    
    setError('');
    setMessage('');
    };

    //coming soon....
    const changeDeck = () => {

    const nameErr = getError(deck.name);
        
        if (nameErr) {
        setError(nameErr);
        return;
        }

    setValues({
            id: id,
            name: '',
            target_language: '',
            translation_language: '',
            picture: []
    });
    setMessage('Coming soon...');
    };

    const getError = (name) => {
    if (!name) return 'Name can not be empty';
    if (name.length < 2 || name.length > 25) return 'Must be between 2-25 characters';
    return '';
    };

    return (
    <Paper sx={{ p: 1, m: 2 }}>
    <Typography variant='h6' sx={{ mb:2 }}>Edit: {constDeck.name}</Typography>
    <Box component='form' autoComplete='off' sx={{ '& .MuiTextField-root': { mb: 2 } }}>

            <TextField label='Name' variant='outlined' name='name'
            value={deck.name} onChange={(e) => change(e)} required fullWidth autoFocus error={!!error} helperText={error}/>

            <TextField select label='Target language' name='target_language' 
            value={deck.target_language} onChange={(e) => change(e)} sx={{ width: '50%' }}>
            {languages.map((language) => (
                <MenuItem key={language.value} value={language.value}>
                {language.label}
                </MenuItem>
            ))}
             </TextField>

            <TextField select label='Translation language' name='translation_language' 
            value={deck.translation_language} onChange={(e) => change(e)} sx={{ width: '50%' }}>
            {languages.map((language) => (
                <MenuItem key={language.value} value={language.value}>
                {language.label}
                </MenuItem>
            ))}
             </TextField>          
            
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => changeDeck()} variant='contained' sx={{ marginRight: 3 }} startIcon={<EditOutlinedIcon />}>Edit Deck</Button>
        <Button onClick={() => clearFields()} variant='contained' color='secondary' startIcon={<ClearIcon />}>Clear</Button>
        </Box>
    </Box>
    <Typography color='success.main'>{message}</Typography>
    </Paper>
    );
}
export default DecklomakeEdit;