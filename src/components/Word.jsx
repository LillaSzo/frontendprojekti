function Word({word}){

    return(
        <>
        <Tpography>Targetword: {word.target_word}</Tpography>
        <Tpography>Translation: {word.translation}</Tpography>
        <Tpography>Sentence: {word.sentence}</Tpography>
        <Tpography>Difficulty: {word.difficulty}</Tpography>
        <Tpography>Added: {word.added}</Tpography>
        </>
    );
}

export default Word;