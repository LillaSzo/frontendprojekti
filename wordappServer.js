const express = require('express');
const app = express();

let helmet = require('helmet');
// Muut domainit saavat käyttää tätä backia
app.use(helmet({ crossOriginResourcePolicy: false }))

// Käsittelee http viestin sisässä lähetettyjä lomakkeita
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// Tuleva data parsitaan JSONiksi, jos se voidaan tulkita sen muotoiseksi
app.use(express.json());

const cors = require('cors');
// Kaikki domainit saavat tehdä pyyntöjä
app.use(cors());

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('wordapp.db', (error) => {
    if (error) {
        console.log(error.message);
        return ({ message: 'Database can not be opened ' + error.message });
    }
    db.run('PRAGMA foreign_keys = ON');
});

app.listen(8080, () => {
    console.log('Node localhost:8080');
});

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Loads' });
});

app.get('/deck/all', (req, res) => {
    db.all('select * from deck', (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        return res.status(200).json(result);
    });
});

app.get('/deck/one/:id', (req, res) => {
    let id = req.params.id;

    db.get('select * from deck where deck_id = ?', [id], (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        // Jos haku ei tuottanut yhtään riviä
        if (typeof (result) == 'undefined') {
            return res.status(404).json({ message: 'No deck with this id' });
        }

        return res.status(200).json(result);
    });
});

app.get('/deck/images', (req, res) => {
    db.all('select picture  from deck ', (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        return res.status(200).json(result);
    });
});

app.delete('/deck/delete/:id', (req, res) => {
    let id = req.params.id;

    // Huomaa, että ei nuolinotaatiofunktiona kuten muissa kohdassa
    db.run('delete from deck where deck_id = ?', [id], function (error) {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        if (this.changes === 0) {
            console.log('Nothing to delete');
            return res.status(404).json({ message: 'No deck to delete' });
        }

        return res.status(200).json({ count: this.changes });
    });
});

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images'); // Mihin kansioon ladataan
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);  // Millä tiedostonimellä
    }
});

const upload = multer({ storage: storage })

app.post('/deck/add', upload.single('picture'), (req, res) => {
    let deck = req.body;

    if (!deck.name || deck.name.trim().length < 2 || deck.name.trim().length > 15) {
        return res.status(400).json({
            message: 'Deck name must be between 2 and 15 characters'
        });
    }

    let pictureName = null;
    if (req.file) {
        pictureName = req.file.originalname;
    }

    db.run('insert into deck (name,target_language,translation_language, picture) values (?, ?, ?, ?)',
        [deck.name, deck.target_language, deck.translation_language, pictureName], (error) => {

            if (error) {
                console.log(error.message);
                return res.status(400).json({ message: error.message });
            }

            return res.status(200).json({ count: 1 });
        });
});

app.put('/deck/update/:id', (req, res) => {
    let id = req.params.id;
    let deck = req.body;

    if (!deck.name || deck.name.trim().length < 2 || deck.name.trim().length > 15) {
     return res.status(400).json({
        message: 'Deck name must be between 2 and 15 characters'
    });
    }

    db.run(`update deck set name = ?, target_language = ?, translation_language = ? WHERE deck_id = ?`,
        [
        deck.name,
        deck.target_language,
        deck.translation_language,
        id
        ],
    function (error) {
            if (error) {
                console.log(error.message);
                return res.status(400).json({ message: error.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: 'No deck found to update' });
            }

            return res.status(200).json({ updated: this.changes });
        }
    );
});

app.get('/download/:name', (req, res) => {
    let file = './images/' + req.params.name;
    res.download(file);
});

app.get('/word/all', (req, res) => {
    db.all('select * from word', (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        return res.status(200).json(result);
    });
});

app.get('/deck/:id/words', (req, res) => {

    let deck_id = req.params.id;
    db.all(
        'select * from word where deck_id = ?',
        [deck_id],
        (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(400).json({message: error.message});
            }
            return res.status(200).json(result);
        }
    );
});

app.get('/word/one/:id', (req, res) => {
    let id = req.params.id;

    db.get('select * from word where word_id = ?', [id], (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        if (typeof (result) == 'undefined') {
            return res.status(404).json({ message: 'No word with this id' });
        }

        return res.status(200).json(result);
    });
});

app.delete('/word/delete/:id', (req, res) => {
    let id = req.params.id;

    db.run('delete from word where word_id = ?', [id], function (error) {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        if (this.changes === 0) {
            console.log('Nothing to delete');
            return res.status(404).json({ message: 'No word to delete' });
        }

        return res.status(200).json({ count: this.changes });
    });
});

app.post('/deck/:id/word', (req, res) => {
    let id = req.params.id;
    let word = req.body;

    if (!word.target_word || word.target_word.trim().length < 2 || word.target_word.trim().length > 15) {
        return res.status(400).json({
            message: 'Target word must be between 2 and 15 characters'
        });
    }

    if (!word.translation || word.translation.trim().length < 2 || word.translation.trim().length > 15) {
        return res.status(400).json({
            message: 'Translation must be between 2 and 15 characters'
        });
    }

    db.run('insert into word (deck_id, target_word, translation, sentence, difficulty, favourite, pos, added) values (?, ?, ?, ?, ?, ?, ?, ?)',
        [id, word.target_word, word.translation, word.sentence, word.difficulty, word.favourite, word.pos, word.added], (error) => {

            if (error) {
                console.log(error.message);
                return res.status(400).json({ message: error.message });
            }

            return res.status(200).json({ count: 1 });
        });
});

app.put('/word/update/:id', (req, res) => {
    let id = req.params.id;
    let word = req.body;

    if (!word.target_word || word.target_word.trim().length < 2 || word.target_word.trim().length > 15) {
    return res.status(400).json({
        message: 'Target word must be between 2 and 15 characters'
        });
    }

    if (!word.translation || word.translation.trim().length < 2 || word.translation.trim().length > 15) {
            return res.status(400).json({
            message: 'Translation must be between 2 and 15 characters'
        });
    }

    db.run(`update word set target_word = ?, translation = ?, sentence = ?, difficulty = ?, favourite = ?, pos = ?, added = ? WHERE word_id = ?`,
        [
        word.target_word, 
        word.translation, 
        word.sentence, 
        word.difficulty,
        word.favourite,
        word.pos,
        word.added,
        id
        ],
    function (error) {
            if (error) {
                console.log(error.message);
                return res.status(400).json({ message: error.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: 'No word found to update' });
            }

            return res.status(200).json({ updated: this.changes });
        }
    );
});

app.get('*splat', (req, res) => {
    return res.status(404).json({ message: 'No Service' });
});