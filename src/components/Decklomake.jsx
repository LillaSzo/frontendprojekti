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

import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import HomeIcon from '@mui/icons-material/Home';

import { Link } from 'react-router';
import { useNavigate } from 'react-router';

import { addDeck } from './decks';

function Decklomake({ }){

    const navigate = useNavigate();

    const[deck, setValues] = useState({
    name: '',
    target_language: 'Finnish',
    translation_language: 'English',
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
        target_language: 'Finnish',
        translation_language: 'English',
        picture: []
        });
    
    setError('');    
    setMessage('');
    };

    let pictureName = ('');
    if (deck.picture !== null){
        pictureName = deck.picture.name;
    }

    const handleAddDeck = async () => {

        const nameErr = getError(deck.name);
        
        if (nameErr) {
        setError(nameErr);
        return;
        }

        const formData = new FormData();
        formData.append('name', deck.name);
        formData.append('target_language', deck.target_language);
        formData.append('translation_language', deck.translation_language);
        formData.append('picture', deck.picture);

        try {
        const response = await addDeck(formData);

        if (response.status !== 200) {
            throw new Error('Failed to add deck');
        }

        navigate('/');
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

    return (
    <Paper sx={{ p: 1, m: 2 }}>
        
    <Typography variant='h6' sx={{ mb:2 }}>Create New Deck</Typography>

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

            <Typography display='inline'>Add picture</Typography>

            <Button component='label' color='secondary' startIcon={<AttachFileOutlinedIcon />}>
            <input accept='image/*' name='picture' type='file' onChange={(e) => changePicture(e)} hidden />
            </Button>

            <Typography display='inline'>{pictureName}</Typography>

            
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => handleAddDeck()} variant='contained' sx={{ marginRight: 1 }} startIcon={<NoteAddOutlinedIcon />}>Create</Button>
        <Button onClick={() => clearFields()} variant='contained' color='secondary' startIcon={<ClearIcon />}>Clear</Button>
        <Button onClick={() => navigate('/')} variant='contained' sx={{ marginLeft: 1 }}  component={Link} to={'/'} startIcon={<HomeIcon />}>Home</Button>
        </Box>

    </Box>

    <Typography variant='h6' color='success.main'>{message}</Typography>

    </Paper>
    );
}
export default Decklomake;