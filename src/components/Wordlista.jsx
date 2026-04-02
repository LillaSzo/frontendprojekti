import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { TextField } from '@mui/material';




function Wordlista({words}){

  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filterWords = words.filter((word) =>
    word.target_word.toLowerCase().includes(search.toLowerCase())
  );

    return (
        <>
        <TextField variant='outlined' sx={{ m:2 }} label='Search' onChange={handleChange}/>
        <TableContainer component={Paper} sx={{width: '97%',  ml: 2, mr: 2, mb: 2, boxShadow: 3,}}>
        <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Target word</TableCell>
            <TableCell align='center'>Translation</TableCell>
            <TableCell align='center'>Sentence</TableCell>
            <TableCell align='left'>Difficulty</TableCell>
            <TableCell align='center'>Added</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterWords.map((word) => (
            <TableRow
              key={word.word_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {word.target_word}
              </TableCell>
              <TableCell align='left'>{word.translation}</TableCell>
              <TableCell align='left'>{word.sentence}</TableCell>
              <TableCell align='left'>{word.difficulty}</TableCell>
              <TableCell align='center'>{word.added}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </>
    );
}
export default Wordlista;