function Word({word}){

    return(
        <p>
        Targetword: {word.target_word}<br/>
        Translation: {word.translation}<br/>
        Sentence: {word.sentence}<br/>
        Difficulty: {word.difficulty}<br/>
        Added: {word.added}
        </p>
    );
}

export default Word;