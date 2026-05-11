import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { Link } from 'react-router';

function Deck ({ deck, handleDelete }){

    return(
    <Card sx={{ width: 230, boxShadow: 'none', bgcolor: 'background.default'  }}>
        {deck.picture ? 
            <CardMedia sx={{ height: 325 }} component='img' image={'http://localhost:8080/download/' + deck.picture} alt={deck.name}/>
            :
            <CardMedia sx={{ height: 325 }} component='img' image={'images/noimg.png'} alt={'No picture'} />
        }

    <CardContent sx={{ p:1 }}>
        <Typography variant='h6' align='center'>{deck.name}</Typography>
        <Typography>Target language: {deck.target_language}</Typography> 
        <Typography>Translation: {deck.translation_language}</Typography>
    </CardContent>

    <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton component={Link} to={'/addword/' + deck.deck_id}><AddOutlinedIcon/></IconButton>
        <IconButton component={Link} to={'/edit/' + deck.deck_id}><EditOutlinedIcon /></IconButton>
        <IconButton component={Link} to={'/deck/' + deck.deck_id + '/words'}><LightbulbOutlinedIcon /></IconButton>
        <IconButton onClick={() => handleDelete(deck.deck_id)}><DeleteOutlinedIcon /></IconButton>
    </CardActions>

    </Card>
    );
}

export default Deck;