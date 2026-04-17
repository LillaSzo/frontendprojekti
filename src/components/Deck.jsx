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

function Deck ({deck}){

    return(
    <Card sx={{ width: 230, boxShadow: 'none', bgcolor: 'background.default'  }}>
        {deck.picture ? 
            <CardMedia sx={{ height: 325 }} component='img' image={deck.picture} alt={deck.name}/>
            :
            <CardMedia sx={{ height: 325 }} component='img' image={'pictures/Yleinen.png'} alt={'No picture'} />
        }

    <CardContent sx={{ p:1, }}>
        <Typography variant='h6' align='center'>{deck.name}</Typography>
        <Typography>Target Language: {deck.target_language}</Typography>  {/* kentä tulee näkyviin, kun backend on toteutettu */}
        <Typography>Translation Language: {deck.translation_language}</Typography> {/* kentä tulee näkyviin, kun backend on toteutettu */}
        <Typography>Wordcount: {deck.wordcount}</Typography>
    </CardContent>

    <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton component={Link} to={'/addword/' + deck.deck_id}><AddOutlinedIcon/></IconButton>
        <IconButton component={Link} to={'/edit/' + deck.deck_id}><EditOutlinedIcon /></IconButton>
        <IconButton component={Link} to={'/learn/' + deck.deck_id}><LightbulbOutlinedIcon /></IconButton>
        <IconButton><DeleteOutlinedIcon /></IconButton>
    </CardActions>

    </Card>
    );
}

export default Deck;