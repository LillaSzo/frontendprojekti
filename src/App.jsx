import Tab from './components/Tab';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import '@fontsource/righteous'

const decks = [
  {
    deck_id: 1,
    name: 'Yleinen',
    target_language: 'Finnish',
    translation_language: 'English',
    picture: 'pictures/redcard.png',
    wordcount: 1
  },
  {
    deck_id: 2,
    name: 'Ohjelmointi',
    target_language: 'Finnish',
    translation_language: 'English',
    picture: 'pictures/purplecard.png',
    wordcount: 7
  }
] 

const words = [
  {
    word_id: 1,
    deck_id: 1,
    target_word: 'kissa',
    translation: 'cat',
    sentence: 'Heikki on paras kissa maailmassa.',
    difficulty: 'easy',
    added: '19-03-2026'
  },

  {
    word_id: 2,
    deck_id: 2,
    target_word: 'oletusarvo',
    translation: 'default value',
    sentence: 'Lomakkeen kentään oli asetettu oletusarvo.',
    difficulty: 'medium',
    added: '19-03-2026'
  },

  {
    word_id: 4,
    deck_id: 2,
    target_word: 'kehys',
    translation: 'framework',
    sentence: 'Spring-kehystä on käytetty backend-sovelluksen rakentamiseen.',
    difficulty: 'medium',
    added: '19-03-2026'
  },
  {
    word_id: 5,
    deck_id: 2,
    target_word: 'nuolinotaatio',
    translation: 'arrow notation',
    sentence: 'Funktiota määritellään nuolinotaatiolla.',
    difficulty: 'medium',
    added: '25-03-2026'
  },
  {
    word_id: 6,
    deck_id: 2,
    target_word: 'perintä',
    translation: 'inheritance',
    sentence: 'Kissa-luokka perii ominaisuutensa Eläin-luokalta.',
    difficulty: 'medium',
    added: '16-01-2026'
  },
  {
    word_id: 7,
    deck_id: 2,
    target_word: 'rajapinta',
    translation: 'interface',
    sentence: 'Rajapinta määrittelee metodit, mutta ei niiden toteutusta.',
    difficulty: 'medium',
    added: '24-02-2026'
  },
  {
    word_id: 8,
    deck_id: 2,
    target_word: 'riippuvuus',
    translation: 'dependency',
    sentence: 'Kontrolleri saa tietokantayhteyden riippuvuuden kautta.',
    difficulty: 'hard',
    added: '05-01-2026'
  },
  {
    word_id: 9,
    deck_id: 2,
    target_word: 'salaus',
    translation: 'encryption',
    sentence: 'Käyttäjän salasana tallennetaan tietokantaan salattuna.',
    difficulty: 'easy',
    added: '20-04-2026'
  }
];

const languages = [
  {
    value: '1',
    label: 'Finnish'
  },
  {
    value: '2',
    label: 'English'
  },
  {
  value: '3',
  label: 'Hungarian'
  },
  {
  value: '4',
  label: 'Swedish'
  }
  ];

  const theme = createTheme({
  palette: {
    primary: { main: '#AEC8A4', contrastText: '#3B3B1A'},
    secondary: { main: '#3B3B1A', contrastText:  '#AEC8A4'},
    error: {main: '#540863'},
    success: {main: '#92487A'},
    text: { primary: '#3B3B1A', secondary: '#8A784E', light: '#E7EFC7'},
    background: {default: '#E7EFC7'},
  },

  typography: {
    fontFamily: '"Righteous", sans-serif'
  },

  components: {

    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#3B3B1A',
          height: '3px',
      },
    },
  },
  
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          '&.Mui-selected' : {
            color: '#8A784E',
          },
          '&:hover':{
            color: '#8A784E',
          },
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#AEC8A4',
        },
      },
    },

    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableRow-root:nth-of-type(even)': {
            backgroundColor: '#AEC8A4',
          },
          '& .MuiTableRow-root:nth-of-type(odd)': {
            backgroundColor: '#E7EFC7',
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #3B3B1A',
        },
      },
    },

    }
  });

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Tab decks={decks} languages={languages} words ={words}/>
      </ThemeProvider>
    </>
  )
}

export default App
