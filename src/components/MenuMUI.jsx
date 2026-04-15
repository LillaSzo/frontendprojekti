import { useState } from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import MenuIcon from '@mui/icons-material/Menu';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import BarChartIcon from '@mui/icons-material/BarChart';

import HomeIcon from '@mui/icons-material/Home';
import { Link, Outlet } from 'react-router';

function MenuMUI() {

  const [anchorNavi, setOpenNavi] = useState(null);

  const menuOpen = (e) => {
    setOpenNavi(e.currentTarget);
  }

  const menuClose = () => {
    setOpenNavi(null);
  }

  const menu =
    <Menu
      anchorEl={anchorNavi}
      open={Boolean(anchorNavi)}
      onClose={() => menuClose()}
      anchorOrigin={{ vertical: 'center', horizontal: 'left' }}>

      <MenuItem onClick={menuClose} component={Link} to='/'>
        <ListItemIcon><LoyaltyIcon /></ListItemIcon>
        <ListItemText primary='Your Decks' />
      </MenuItem>

      <MenuItem onClick={() => menuClose()} component={Link} to='/add'>
        <ListItemIcon><NoteAddIcon /></ListItemIcon>
        <ListItemText primary='Create Deck' />
      </MenuItem>

      <MenuItem onClick={() => menuClose()} component={Link} to='/statistics'>
        <ListItemIcon><BarChartIcon /></ListItemIcon>
        <ListItemText primary='Statistics' />
      </MenuItem>
    </Menu>;

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <IconButton onClick={(e) => menuOpen(e)} color='inherit'>
            <MenuIcon />
          </IconButton>

          {menu}

          <Typography variant='h5' component='h5' sx={{ flexGrow: 1, textAlign: 'center' }}>WordApp</Typography>

        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}

export default MenuMUI;
