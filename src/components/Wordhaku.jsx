import { useState } from 'react';
import Word from './Word';

function Wordhaku({words}){
    const[input, setInput] = useState('');
    const[answerlist, setAnswerlist] = useState('');

    const change = (e) => {
        setInput(e.target.value);
    }

    const search = () => {
        let result = words.filter(w => w.target_word.toUpperCase().includes(input.toUpperCase()));
        let answer;

        if(result.length===0){
            answer = <p>Word not found</p>;
        }else{
            answer = result.map((w) => {
                return (
                    <Word word={w} key={w.word_id}/>
                );
            })
         }
        setAnswerlist(answer);
    }
    
    return (
    <>
        <form>   
        <input type='text' name='input' value={input} onChange={(e) => change(e)} placeholder='Search from words' />
   
        <input type='button' value='Search' onClick={() => search()}/>
        </form>
         {answerlist}
    </>
    );
}
export default Wordhaku;