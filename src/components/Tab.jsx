import { useState } from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import LoyaltyIcon from '@mui/icons-material/Loyalty';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import Decklomake from './Decklomake';
import Decklista from './Decklista';
import Wordlomake from './Wordlomake';


function TabMUI({ decks, languages }) {

  const [value, setValue] = useState(0);

  const handleChange = (e, val) => {
    setValue(val);
  }

  return (
    <Box>
      <AppBar position='static'>
        <Tabs value={value} variant='fullWidth' textColor='inherit'
          onChange={(e, val) => handleChange(e, val)}>
          <Tab label='Create new deck' icon={<NoteAddOutlinedIcon />} />
          <Tab label= 'Your decks' icon={<LoyaltyIcon />} />
          <Tab label= 'Add words' icon={<AddOutlinedIcon />} />
        </Tabs>
      </AppBar>
      {value === 0 && <Decklomake languages={languages}/>}
      {value === 1 && <Decklista decks={decks}/>}
      {value === 2 && <Wordlomake />}
    </Box>
  );
}

export default TabMUI;