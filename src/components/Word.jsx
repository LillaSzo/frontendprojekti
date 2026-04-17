import Typography from '@mui/material/Typography';

function Word({word}){

    return(
        <>
        <Typography>Targetword: {word.target_word}</Typography>
        <Typography>Translation: {word.translation}</Typography>
        <Typography>Sentence: {word.sentence}</Typography>
        <Typography>Difficulty: {word.difficulty}</Typography>
        <Typography>Added: {word.added}</Typography>
        </>
    );
}

export default Word;