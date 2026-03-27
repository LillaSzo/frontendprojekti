import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import IconButton from '@mui/material/IconButton';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

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
        <Typography>Target Language: {deck.target_language}</Typography>
        <Typography>Translation language: {deck.translation_language}</Typography>
        <Typography>Wordcount: {deck.wordcount}</Typography>
    </CardContent>
    <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
    <IconButton><AddOutlinedIcon/></IconButton>
    <IconButton><EditOutlinedIcon /></IconButton>
    <IconButton><LightbulbOutlinedIcon /></IconButton>
    <IconButton><DeleteOutlinedIcon /></IconButton>
    </CardActions>
    </Card>
    );
}

export default Deck;