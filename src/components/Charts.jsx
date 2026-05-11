import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';


import { getDecks } from './decks';
import { getWords } from './decks';

import FavoriteIcon from '@mui/icons-material/Favorite';

function Charts(){

    const navigate = useNavigate();
    const theme = useTheme();

    const [decks, setDecks] = useState([]);
    const [words, setWords] = useState([]);
    const [message, setMessage] = useState('Searching');

    const fetchDeckData = async () => {
        try {
        const response = await getDecks();

        if (response.status !== 200) {
            throw new Error('Failed to search decks');
        }

        if (response.data.length === 0) {
            throw new Error('No decks to load');
        }

        setDecks(response.data);
        setMessage('');

        } catch (error) {

        navigate('/error', {
            replace: true,
            state: { errormessage: error.message }
        });
        }
    }

    useEffect(() => { fetchDeckData() }, []);

    const fetchWordData = async () => {
        try {
        const response = await getWords();

        if (response.status !== 200) {
            throw new Error('Failed to search words');
        }

        if (response.data.length === 0) {
            throw new Error('No words to load');
        }

        setWords(response.data);
        setMessage('');

        } catch (error) {

        navigate('/error', {
            replace: true,
            state: { errormessage: error.message }
        });
        }
    }
    useEffect(() => { fetchWordData() }, []);
   
    if (message.length > 0) {
        return (<Typography>{message}</Typography>)
    }

    const data = Object.entries(words.reduce((acc, word) => {
    acc[word.difficulty] = (acc[word.difficulty] || 0) + 1;
    return acc;
    }, {})).map(([difficulty, count])=> ({ label: difficulty, value: count}));

    const calculatePercentage = (params) => {
        const pros = params.value / words.length * 100;
        return pros.toFixed(0) + '%';
    };

    const countTotalDecks = () => {
        return decks.length;
    }
    
    const countTotalWords = () => {
        return words.length;
    }

    const countFavouriteWords = () => {
    return words.filter(word => word.favourite === 1).length;
    }

    const colors = {
        'easy': theme.palette.primary.main,
        'medium': theme.palette.text.secondary,
        'hard': theme.palette.secondary.main,
    };

    const colorData = data.map(difficulty => {
        return (
            {
                value: difficulty.value,
                label: difficulty.label,
                color: colors[difficulty.label]
            }
        )
    });

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dataset = monthNames.map((name, index) => {
    const count = words.reduce((acc, word) => {
    const month = new Date(word.added).getMonth();
    return acc + (month === index ? 1 : 0);
    }, 0);
    
    return { month: name, wordsAdded: count };
    });

    return(

     <Grid container spacing={2} justifyContent={'center'} alignItems={'center'} sx={{ p:2 }} >

        <Grid>
        <Card sx={{ width: 230, height:150, bgcolor: 'primary.main', color: 'primary.contrastText', boxShadow: 'none'}}>
            <CardContent>
                <Typography variant='h6' align='center'>Total Decks</Typography>
                <Typography variant='h2' align='center'>{countTotalDecks()}</Typography>
            </CardContent>
        </Card>
        </Grid>

        <Grid>
        <Card  sx={{ width: 230, height:150, bgcolor: 'secondary.main', color: 'secondary.contrastText', boxShadow: 'none'}} >
            <CardContent>
                <Typography variant='h6' align='center'>Total Words</Typography>
                <Typography variant='h2' align='center'>{countTotalWords()}</Typography>
            </CardContent>
        </Card>
        </Grid>

        <Grid>
        <Card sx={{ width: 230, height:150, bgcolor: 'primary.main', color: 'primary.contrastText', boxShadow: 'none'}}>
            <CardContent>
                <Typography variant='h6' align='center'><FavoriteIcon /></Typography>
                <Typography variant='h2' align='center'>{countFavouriteWords()}</Typography>
            </CardContent>
        </Card>
        </Grid>

        <Grid>
        <Card sx={{boxShadow: 'none', bgcolor: 'background.default'}}>
        <CardHeader title={'Word difficulty'} align='center'/>   
        <PieChart
        series={[
        {
        arcLabel: calculatePercentage, 
        data: colorData,
        },
        ]}
        width={350}
        height={250}
        sx={{
            '& .MuiPieArcLabel-root': {
                fill: theme.palette.text.light,
                },
            }}
        />
        </Card>
        </Grid>
        
        <Grid>
        <Card sx={{ bgcolor: 'background.default', color: 'primary.contrastText', boxShadow: 'none'}}>
        <BarChart
        dataset={dataset}
        width={600}
        height={350}
        series={[{
        dataKey: 'wordsAdded',
        label: 'Words Added',
        color: theme.palette.text.secondary,
        }]}        
        xAxis={[
            { 
            dataKey: 'month',
            type: 'category',
            }
        ]}
        
        />
        </Card>
        </Grid>
    </Grid>   
    );
}

export default Charts;