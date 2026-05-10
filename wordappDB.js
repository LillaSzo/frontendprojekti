const decks = [
  {
    deck_id: 1,
    name: 'Yleinen',
    target_language: 'Finnish',
    translation_language: 'English',
    picture: 'redcard.png',
  },
  {
    deck_id: 2,
    name: 'Ohjelmointi',
    target_language: 'Finnish',
    translation_language: 'English',
    picture: 'purplecard.png',
  },
  {    
    deck_id: 3,
    name: 'Tyhjä Test',
    target_language: 'Finnish',
    translation_language: 'English',
    picture: 'bluecard.png',
  }
];

const words = [
  {
    word_id: 1,
    deck_id: 1,
    target_word: 'kissa',
    translation: 'cat',
    sentence: 'Heikki on paras kissa maailmassa.',
    difficulty: 'easy',
    favourite: false,
    pos: 'noun',
    added: '2026-03-19'
  },

  {
    word_id: 2,
    deck_id: 2,
    target_word: 'oletusarvo',
    translation: 'default value',
    sentence: 'Lomakkeen kentään oli asetettu oletusarvo.',
    difficulty: 'medium',
    favourite: true,
    pos: 'noun',
    added: '2026-03-19'
  },

  {
    word_id: 4,
    deck_id: 2,
    target_word: 'kehys',
    translation: 'framework',
    sentence: 'Spring-kehystä on käytetty backend-sovelluksen rakentamiseen.',
    difficulty: 'medium',
    favourite: false,
    pos: 'noun',
    added: '2026-03-19'
  },
  {
    word_id: 5,
    deck_id: 2,
    target_word: 'nuolinotaatio',
    translation: 'arrow notation',
    sentence: 'Funktiota määritellään nuolinotaatiolla.',
    difficulty: 'medium',
    favourite: false,
    pos: 'noun',
    added: '2026-03-25'
  },
  {
    word_id: 6,
    deck_id: 2,
    target_word: 'perintä',
    translation: 'inheritance',
    sentence: 'Kissa-luokka perii ominaisuutensa Eläin-luokalta.',
    difficulty: 'medium',
    favourite: false,
    pos: 'noun',
    added: '2026-01-16'
  },
  {
    word_id: 7,
    deck_id: 2,
    target_word: 'rajapinta',
    translation: 'interface',
    sentence: 'Rajapinta määrittelee metodit, mutta ei niiden toteutusta.',
    difficulty: 'medium',
    favourite: true,
    pos: 'noun',
    added: '2026-02-24'
  },
  {
    word_id: 8,
    deck_id: 2,
    target_word: 'riippuvuus',
    translation: 'dependency',
    sentence: 'Kontrolleri saa tietokantayhteyden riippuvuuden kautta.',
    difficulty: 'hard',
    favourite: false,
    pos: 'noun',
    added: '2026-01-05'
  },
  {
    word_id: 9,
    deck_id: 2,
    target_word: 'salaus',
    translation: 'encryption',
    sentence: 'Käyttäjän salasana tallennetaan tietokantaan salattuna.',
    difficulty: 'easy',
    favourite: false,
    pos: 'noun',
    added: '2026-05-10'
  }
];

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('wordapp.db');

db.serialize(() => {
    db.run('PRAGMA foreign_keys = ON');

    db.run(`DROP TABLE IF EXISTS word`);
    db.run('DROP TABLE IF EXISTS deck');


    db.run(`
    CREATE TABLE deck (
      deck_id INTEGER PRIMARY KEY,
      name TEXT NOT NULL CHECK(length(name) BETWEEN 2 AND 15),
      target_language TEXT,
      translation_language TEXT,
      picture TEXT
    )
    `);

    db.run(`
    CREATE TABLE word (
    word_id INTEGER PRIMARY KEY,
    deck_id INTEGER,
    target_word TEXT NOT NULL CHECK(length(target_word) BETWEEN 2 AND 15),
    translation TEXT NOT NULL CHECK(length(translation) BETWEEN 2 AND 15),
    sentence TEXT,
    difficulty TEXT,
    favourite BOOLEAN,
    pos TEXT,
    added TEXT,
    FOREIGN KEY (deck_id) REFERENCES deck(deck_id) ON DELETE CASCADE
    )
    `);

    const stmt = db.prepare(`
    INSERT INTO deck 
    (deck_id, name, target_language, translation_language, picture)
    VALUES (?, ?, ?, ?, ?)
    `);

    decks.forEach(deck => {
        stmt.run(
            deck.deck_id,
            deck.name,
            deck.target_language,
            deck.translation_language,
            deck.picture
        );
        console.log('Row added ' + deck.name);
    });

    stmt.finalize();

  const wordStmt = db.prepare(`
    INSERT INTO word 
    (word_id, deck_id, target_word, translation, sentence, difficulty, favourite, pos, added)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

words.forEach(word => {
  wordStmt.run(
    word.word_id,
    word.deck_id,
    word.target_word,
    word.translation,
    word.sentence,
    word.difficulty,
    word.favourite,
    word.pos,
    word.added
    );
    });

    wordStmt.finalize();

    });

db.close();