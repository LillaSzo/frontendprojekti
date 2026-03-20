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

import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import ClearIcon from '@mui/icons-material/Clear';

function Wordlomake(){

    const[word, setValues] = useState({
    target_word: '',
    translation: '',
    sentence: '',
    difficulty: '',
    added: new Date()
    });

    const [message, setMessage] = useState('');

    const change = (e) => {
    setValues({
        ...word,
        [e.target.name]: e.target.value
        });

    setMessage('')

    };

    const clearFields = () => {
        setValues({
        ...word,
        target_word: '',
        translation: '',
        sentence: '',
        difficulty: '',
        added: new Date()
        });
    };

    const addWord = () => {

        if(word.target_word === '' || word.translation === ''){
        setMessage('Targetword and translation can not be empty!')

        }else{setMessage('Word added!')
        setValues({
            target_word: '',
            translation: '',
            sentence: '',
            difficulty: '',
            added: new Date()
    });
    }
    };

    return (
    <Paper sx={{ p: 1, m: 2 }}>
    <Box component='form' autoComplete='off' sx={{ '& .MuiTextField-root': { mb: 2 } }}>

            <TextField label='Target word' variant='outlined' name='target_word' 
            value={word.target_word} onChange={(e) => change(e)} required sx={{ width: '50%' }} />

            <TextField label='Translation' variant='outlined' name='translation' 
            value={word.translation} onChange={(e) => change(e)} required sx={{ width: '50%' }} />

            <TextField label='Sentence' variant='outlined' name='sentence' 
            value={word.sentence} onChange={(e) => change(e)} fullWidth />

            <FormControl fullWidth sx ={{ p:1, m:1 } }>
                <FormLabel id='difficulty'>Difficulty</FormLabel>
                <RadioGroup row name='difficulty'
                value={word.difficulty || 'easy'} onChange={change}>
                        <FormControlLabel value='easy' control={<Radio />} label='Easy' />
                        <FormControlLabel value='medium' control={<Radio />} label='Medium' />
                        <FormControlLabel value='hard' control={<Radio />} label='Hard' />
                    </RadioGroup>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
            <DesktopDatePicker label='Word added' value={word.added} disabled sx={{ width: '25%' }} />
            </LocalizationProvider>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 3 }}>
            <Button onClick={() => addWord()} variant='contained' sx={{ marginRight: 3 }} startIcon={<NoteAddOutlinedIcon />}>Create</Button>
            <Button onClick={() => clearFields()} variant='contained' color='secondary' startIcon={<ClearIcon />}>Clear</Button>
            </Box>
    </Box>
        <Typography sx={{ marginTop: 3}}>{message}</Typography>
    </Paper>
    );
}
export default Wordlomake;