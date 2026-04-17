import MenuMUI from './components/MenuMUI';
import Decklista from './components/Decklista';
import Decklomake from './components/Decklomake';
import Charts from './components/Charts';
import Wordtable from './components/Wordtable';
import Wordlomake from './components/Wordlomake';
import DecklomakeEdit from './components/DecklomakeEdit';
import Error from './components/Error';


import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { BrowserRouter, Routes, Route } from 'react-router';

import '@fontsource/righteous'

const decks = [
  {
    deck_id: 1,
    name: 'Yleinen',
    target_language_id: 1,
    translation_language_id: 2,
    picture: 'pictures/redcard.png',
    wordcount: 1
  },
  {
    deck_id: 2,
    name: 'Ohjelmointi',
    target_language_id: 1,
    translation_language_id: 2,
    picture: 'pictures/purplecard.png',
    wordcount: 7
  },
  {    
    deck_id: 3,
    name: 'Tyhjä Test',
    target_language_id: 1,
    translation_language_id: 2,
    picture: 'pictures/bluecard.png',
    wordcount: 0
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
    added: '19.03.2026'
  },

  {
    word_id: 2,
    deck_id: 2,
    target_word: 'oletusarvo',
    translation: 'default value',
    sentence: 'Lomakkeen kentään oli asetettu oletusarvo.',
    difficulty: 'medium',
    added: '19.03.2026'
  },

  {
    word_id: 4,
    deck_id: 2,
    target_word: 'kehys',
    translation: 'framework',
    sentence: 'Spring-kehystä on käytetty backend-sovelluksen rakentamiseen.',
    difficulty: 'medium',
    added: '19.03.2026'
  },
  {
    word_id: 5,
    deck_id: 2,
    target_word: 'nuolinotaatio',
    translation: 'arrow notation',
    sentence: 'Funktiota määritellään nuolinotaatiolla.',
    difficulty: 'medium',
    added: '25.03.2026'
  },
  {
    word_id: 6,
    deck_id: 2,
    target_word: 'perintä',
    translation: 'inheritance',
    sentence: 'Kissa-luokka perii ominaisuutensa Eläin-luokalta.',
    difficulty: 'medium',
    added: '16.01.2026'
  },
  {
    word_id: 7,
    deck_id: 2,
    target_word: 'rajapinta',
    translation: 'interface',
    sentence: 'Rajapinta määrittelee metodit, mutta ei niiden toteutusta.',
    difficulty: 'medium',
    added: '24.02.2026'
  },
  {
    word_id: 8,
    deck_id: 2,
    target_word: 'riippuvuus',
    translation: 'dependency',
    sentence: 'Kontrolleri saa tietokantayhteyden riippuvuuden kautta.',
    difficulty: 'hard',
    added: '05.01.2026'
  },
  {
    word_id: 9,
    deck_id: 2,
    target_word: 'salaus',
    translation: 'encryption',
    sentence: 'Käyttäjän salasana tallennetaan tietokantaan salattuna.',
    difficulty: 'easy',
    added: '20.04.2026'
  }
];

const languages = [
  {
    language_id: 1,
    language: 'Finnish'
  },
  {
    language_id: 2,
    language: 'English'
  },
  {
    language_id: 3,
    language: 'Hungarian'
  },
  {
    language_id: 4,
    language: 'Swedish'
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

  MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }),
      },
    },

  MuiListItemIcon: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.contrastText,
        }),
      },
    },

  MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({    

          '&:hover': {
            backgroundColor: theme.palette.primary.contrastText,
            color: theme.palette.primary.main,
            '& .MuiListItemIcon-root': {
              color: theme.palette.primary.main,
            },
          },
          '&.Mui-selected:hover': {
          backgroundColor: theme.palette.primary.contrastText,
          color: theme.palette.primary.main,
          },
        }),
      },
    },  

    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused':{
            color: '#3B3B1A',
          },
        },
      },
    },

    MuiOutlinedInput: {
     styleOverrides: {
      root: {
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#AEC8A4',
          borderWidth: '2px',
          },
        },
      },
    },

    MuiRadio: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
          color: '#3B3B1A',
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FAF9F6',
          boxShadow: '0px 3px 6px rgba(0,0,0,0.3)',
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

    MuiTableSortLabel: {
      styleOverrides: {
      icon: {
      color: '#3B3B1A',
      opacity: 1, 
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

          <BrowserRouter>
          <Routes>
            <Route path='/' element={<MenuMUI decks={decks} languages={languages} words ={words}/>} >
              <Route index element={<Decklista decks={decks}/>} />
              <Route path='/add' element={<Decklomake languages={languages}/>} />
              <Route path='/addword/:id' element={<Wordlomake decks={decks}/>} />
              <Route path='/edit/:id' element={<DecklomakeEdit decks={decks} languages = {languages}/>} />
              <Route path='/learn/:id' element={<Wordtable words={words} decks = {decks}/>} />
              <Route path='/statistics' element={<Charts decks={decks} words = {words} />} />
              <Route path='/error' element={<Error />} />
              <Route path='*' element={<Error error='Page not found' />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
