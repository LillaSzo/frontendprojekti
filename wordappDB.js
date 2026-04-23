const decks = [
  {
    deck_id: 1,
    name: 'Yleinen',
    target_language_id: 1,
    translation_language_id: 2,
    picture: 'redcard.png',
  },
  {
    deck_id: 2,
    name: 'Ohjelmointi',
    target_language_id: 1,
    translation_language_id: 2,
    picture: 'purplecard.png',
  },
  {    
    deck_id: 3,
    name: 'Tyhjä Test',
    target_language_id: 1,
    translation_language_id: 2,
    picture: 'bluecard.png',
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

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('wordapp.db');

db.serialize(() => {
    db.run('PRAGMA foreign_keys = ON');

    db.run(`DROP TABLE IF EXISTS word`);
    db.run('DROP TABLE IF EXISTS deck');
    db.run(`DROP TABLE IF EXISTS language`);


    db.run(`
    CREATE TABLE language (
    language_id INTEGER PRIMARY KEY,
    language TEXT
    )
    `);

    db.run(`
    CREATE TABLE deck (
      deck_id INTEGER PRIMARY KEY,
      name TEXT,
      target_language_id INTEGER,
      translation_language_id INTEGER,
      picture TEXT,
      FOREIGN KEY (target_language_id) REFERENCES language(language_id),
      FOREIGN KEY (translation_language_id) REFERENCES language(language_id)
    )
    `);

    db.run(`
    CREATE TABLE word (
    word_id INTEGER PRIMARY KEY,
    deck_id INTEGER,
    target_word TEXT,
    translation TEXT,
    sentence TEXT,
    difficulty TEXT,
    added TEXT,
    FOREIGN KEY (deck_id) REFERENCES deck(deck_id) ON DELETE CASCADE
    )
    `);


    const langStmt = db.prepare(`
    INSERT INTO language 
    (language_id, language)
    VALUES (?, ?)
    `);

    languages.forEach(lang => {
    langStmt.run(lang.language_id, lang.language);
    });

    langStmt.finalize();

    const stmt = db.prepare(`
    INSERT INTO deck 
    (deck_id, name, target_language_id, translation_language_id, picture)
    VALUES (?, ?, ?, ?, ?)
    `);

    decks.forEach(deck => {
        stmt.run(
            deck.deck_id,
            deck.name,
            deck.target_language_id,
            deck.translation_language_id,
            deck.picture
        );
        console.log('Row added ' + deck.name);
    });

    stmt.finalize();

  const wordStmt = db.prepare(`
    INSERT INTO word 
    (word_id, deck_id, target_word, translation, sentence, difficulty, added)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

words.forEach(word => {
  wordStmt.run(
    word.word_id,
    word.deck_id,
    word.target_word,
    word.translation,
    word.sentence,
    word.difficulty,
    word.added
    );
    });

    wordStmt.finalize();

    });

db.close();