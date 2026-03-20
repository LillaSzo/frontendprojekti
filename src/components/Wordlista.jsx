import Word from './Word';

function Wordlista({words}){
    
    if(words.length === 0) {
        return (<p>No words found</p>)
    }

    return (
        <>
            {
            words.map((w) => {
                
            return (
            <Word word={w} key={w.word_id}/>
                );        
            })
            }   
        </>
    );
}
export default Wordlista;