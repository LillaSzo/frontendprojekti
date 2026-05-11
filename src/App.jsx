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
          boxShadow: '0px 1px 3px #3B3B1A',
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          boxShadow: '0px 3px 6px #3B3B1A',
        },
        
        columnHeader: {
          backgroundColor: '#AEC8A4',

          '& .MuiIconButton-root': {
            backgroundColor: 'transparent',
          },
          '& .MuiIconButton-root:hover': {
            backgroundColor: 'transparent',
          },
        },

        columnSeparator: {
          color: '#3B3B1A',
        },

        footerContainer: {
          backgroundColor: '#E7EFC7',
        },

        cell: {
          borderBottom: '1px solid #3B3B1A',
        },

        row: {
          '&:nth-of-type(even)': {
            backgroundColor: '#AEC8A4',
          },
          '&:nth-of-type(odd)': {
            backgroundColor: '#E7EFC7',
          },
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
            <Route path='/' element={<MenuMUI />} >
              <Route index element={<Decklista />} />
              <Route path='/add' element={<Decklomake />} />
              <Route path='/addword/:id' element={<Wordlomake />} />
              <Route path='/edit/:deck_id' element={<DecklomakeEdit />} />
              <Route path='/deck/:id/words' element={<Wordtable />} />
              <Route path='/statistics' element={<Charts />} />
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
