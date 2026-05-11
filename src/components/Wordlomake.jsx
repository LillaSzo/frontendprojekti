import { useState } from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import fi from 'date-fns/locale/fi';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';

import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import HomeIcon from '@mui/icons-material/Home';

import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';

import { getDeckById } from './decks';
import { addWordtoDeck } from './decks';


function Wordlomake({  }){

    let { id } = useParams();
    let deck_id = Number( id );
    const navigate = useNavigate();
    const [selectedDeck, setSelectedDeck] = useState(null);
 

    const[word, setValues] = useState({
    target_word: '',
    translation: '',
    sentence: '',
    difficulty: 'easy',
    favourite: false,
    pos: 'noun',
    added: new Date()
    });

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({ 
    target_word: '', 
    translation: '' });

    useEffect(() => {
    const fetchDeck = async () => {
    const response = await getDeckById(deck_id);

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
    }, [deck_id, navigate]);
    

    if (!selectedDeck) {
    return <Typography>Loading...</Typography>;
    }

    const change = (e) => {
    setValues({
        ...word,
        [e.target.name]: e.target.value
        });

    setMessage('')
    setErrors({
    target_word: '',
    translation: ''
    });
    };

    const handleFavourite = (e) => {
    setValues({
    ...word,
    favourite: e.target.checked
    });
    };

    const clearFields = () => {
        setValues({
        ...word,
        target_word: '',
        translation: '',
        sentence: '',
        difficulty: 'easy',
        favourite: false,
        pos: 'noun',
        added: new Date()
        });
    setErrors({
    target_word: '',
    translation: ''
    });
    };

    const addWord = async () => {
        const fieldErr1 = getErrors(word.target_word);
        const fieldErr2 = getErrors(word.translation);

        if (fieldErr1 || fieldErr2) {
        setErrors({ 
            target_word: fieldErr1, 
            translation: fieldErr2 });
        return;
        }

    try {
    const response = await addWordtoDeck(id, {
      target_word: word.target_word,
      translation: word.translation,
      sentence: word.sentence,
      difficulty: word.difficulty,
      favourite: word.favourite,
      pos: word.pos,
      added: word.added,
    });

    if (response.status !== 200) {
      throw new Error('Failed to add word');
    }

    clearFields();
    setMessage('Word added successfully');

    } catch (error) {
    navigate('/error', {
      replace: true,
      state: { errormessage: error.message }
    });
  }
};

    const getErrors=(word) => {
    if (!word) return 'Field can not be empty'
    if (word.length < 2 || word.length > 15) return 'Must be between 2-15 characters';
    return '';
    }

    return (
    <Paper sx={{ p: 1, m: 2 }}>

    <Typography variant='h6' sx={{ mb:1 }}>Add words to: {selectedDeck.name}</Typography>

    <Box component='form' autoComplete='off' sx={{ '& .MuiTextField-root': { mb: 2 } }}>

        <TextField label='Target word' variant='outlined' name='target_word' 
        value={word.target_word} onChange={(e) => change(e)} required sx={{ width: '50%' }} error={!!errors.target_word} helperText={errors.target_word}/>

        <TextField label='Translation' variant='outlined' name='translation' 
        value={word.translation} onChange={(e) => change(e)} required sx={{ width: '50%' }} error={!!errors.translation} helperText={errors.translation}/>

        <TextField label='Sentence' variant='outlined' name='sentence' 
        value={word.sentence} onChange={(e) => change(e)} fullWidth />

        <FormControl sx={{ width: '50%' }}>
        <InputLabel id="pos">Part of Speech</InputLabel>
        <Select name = 'pos' labelId="pos" id="pos" value={word.pos} label="Part of Speech" onChange={(e) => change(e)}>
        <MenuItem value={'noun'}>Noun</MenuItem>
        <MenuItem value={'verb'}>Verb</MenuItem>
        <MenuItem value={'adjective'}>Adjective</MenuItem>
        <MenuItem value={'adverb'}>Adverb</MenuItem>
        <MenuItem value={'pronoun'}>Pronoun</MenuItem>

        </Select>
        </FormControl>

        
        <Typography sx={{ display: 'inline', ml: 2 }}>Favourite</Typography>
        <Switch checked={word.favourite} onChange={(e) => handleFavourite(e)}/>

        <FormControl fullWidth sx ={{ p:1, m:1 } }>
        <FormLabel id='difficulty'>Difficulty</FormLabel>

        <RadioGroup row name='difficulty' value={word.difficulty || 'easy'} onChange={(e) => change(e)}>
            <FormControlLabel value='easy' control={<Radio />} label='Easy' />
            <FormControlLabel value='medium' control={<Radio />} label='Medium' />
            <FormControlLabel value='hard' control={<Radio />} label='Hard' />
        </RadioGroup>

        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
        <DesktopDatePicker label='Word added' value={word.added} disabled sx={{ width: '25%' }} />
        </LocalizationProvider>
            
        <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 3 }}>

            <Button onClick={() => addWord()} variant='contained' sx={{ marginRight: 1 }} startIcon={<NoteAddOutlinedIcon />}>Create</Button>
            <Button onClick={() => clearFields()} variant='contained' color='secondary' startIcon={<ClearIcon />}>Clear</Button>
            <Button onClick={() => navigate('/')} variant='contained' sx={{ marginLeft: 1 }}  component={Link} to={'/'} startIcon={<HomeIcon />}>Home</Button>
        
        </Box>
    </Box>

    <Typography variant='h6' color='success.main'>{message}</Typography>

    </Paper>
    );
}
export default Wordlomake;