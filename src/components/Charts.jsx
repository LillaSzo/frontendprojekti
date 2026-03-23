import { PieChart } from '@mui/x-charts';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function Charts({decks, words}){

    const data = Object.entries(words.reduce((acc, word) => {
    acc[word.difficulty] = (acc[word.difficulty] || 0) + 1;
    return acc;
    }, {})).map(([difficulty, count])=> ({ label: difficulty, value: count}));

    const showCount = (params) => {
        return params.value;  
    }

    const countTotalDecks = () => {
        return decks.length;
    }
    
    const countTotalWords = () => {
        return words.length;
    }

    return(

     <Grid container spacing={2} justifyContent={'center'} alignItems={'center'} sx={{ p:2 }} >

        <Grid size={{xs:6, md:4}}>
        <Card  sx={{ width: 230, height:150, bgcolor: 'primary.main', boxShadow: 'none'}}>
            <CardContent>
                <Typography variant='h6' align='center'>Total Decks</Typography>
                <Typography variant='h2' align='center'>{countTotalDecks()}</Typography>
            </CardContent>
        </Card>
        </Grid>

        <Grid size={{xs:6, md:4}}>
        <Card  sx={{ width: 230, height:150, bgcolor: 'primary.main', boxShadow: 'none'}} >
            <CardContent>
                <Typography variant='h6' align='center'>Total Words</Typography>
                <Typography variant='h2' align='center'>{countTotalWords()}</Typography>
            </CardContent>
        </Card>
        </Grid>

        <Grid size={{xs:12, md:6}}>
        <Card sx={{boxShadow: 'none'}}>
        <CardHeader title={'Word difficulty'} />   
        <PieChart
        series={[
        {
        arcLabel: showCount, 
        data
        },
        ]}
        width={350}
        height={250}
        />
        </Card>
        </Grid>
    </Grid>   
    );
}

export default Charts;