import Tab from './components/Tab';

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
    wordcount: 2
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
    word_id: 3,
    deck_id: 2,
    target_word: 'nuolinotaatio',
    translation: 'arrow notation',
    sentence: 'Funktiota määritellään nuolinotaatiolla.',
    difficulty: 'medium',
    added: '19-03-2026'
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

function App() {

  return (
    <>
    <Tab decks={decks} languages={languages}/>
    </>
  )
}

export default App
