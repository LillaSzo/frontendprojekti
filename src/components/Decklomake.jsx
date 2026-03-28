import { useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import ClearIcon from '@mui/icons-material/Clear';

function Decklomake({languages}){

    const[deck, setValues] = useState({
    name: '',
    target_language: '',
    translation_language: '',
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

    const changePicture = (e) => {
        setValues({
        ...deck,
        picture: e.target.files[0]
        });
    };

    const clearFields = () => {
        setValues({
        ...deck,
        name: '',
        target_language: '',
        translation_language: '',
        picture: ''
        });
    
    setError('');
    };

    const addDeck = () => {
        const nameErr = getError(deck.name);
        if (nameErr) {
        setError(nameErr);
        return;
        }

        setValues({
            name: '',
            target_language: '',
            translation_language: '',
            picture: ''
    });
    setMessage('Deck Added!');
    };

    const getError = (name) => {
    if (!name) return 'Name can not be empty';
    if (name.length < 2 || name.length > 25) return 'Must be between 2-25 characters';
    return '';
    };

    return (
    <Paper sx={{ p: 1, m: 2, }}>

    <Box component='form' autoComplete='off' sx={{ '& .MuiTextField-root': { mb: 2 } }}>

            <TextField label="Name" variant="outlined" name="name"
            value={deck.name} onChange={(e) => change(e)} required fullWidth autoFocus error={!!error} helperText={error}/>

            <TextField select label="Target language" name="target_language" 
            value={deck.target_language || 1} onChange={(e) => change(e)} sx={{ width: '50%' }}>
            {languages.map((language) => (
                <MenuItem key={language.value} value={language.value}>
                {language.label}
                </MenuItem>
            ))}
             </TextField>

            <TextField select label="Translation language" name="translation_language" 
            value={deck.translation_language || 2} onChange={(e) => change(e)} sx={{ width: '50%' }}>
            {languages.map((language) => (
                <MenuItem key={language.value} value={language.value}>
                {language.label}
                </MenuItem>
            ))}
             </TextField>          

            <Typography display='inline'>Add picture</Typography>
            <Button component='label' color='secondary' startIcon={<AttachFileOutlinedIcon />}>
            <input accept='image/*' name='picture' type='file'
            onChange={(e) => changePicture(e)} hidden />
            </Button>
            
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => addDeck()} variant='contained' sx={{ marginRight: 3 }} startIcon={<NoteAddOutlinedIcon />}>Create</Button>
        <Button onClick={() => clearFields()} variant='contained' color='secondary' startIcon={<ClearIcon />}>Clear</Button>
        </Box>
    </Box>
    <Typography color='success.main'>{message}</Typography>
    </Paper>
    );
}
export default Decklomake;