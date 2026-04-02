import { PieChart } from '@mui/x-charts/PieChart';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';


function Charts({decks, words}){
    const theme = useTheme();

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
    </Grid>   
    );
}

export default Charts;