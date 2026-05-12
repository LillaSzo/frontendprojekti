import axios from 'axios';

let palvelin = 'http://localhost:8080/';

export const getDecks = async () => {
  try {
    const response = await axios.get(palvelin + 'deck/all');
    return (response);
  } catch (error) {
    return ({ status: error.status, message: 'Failed to load: ' + error.message });
  }
}

export const getDeckById = async (deck_id) => {
  try {
    const response = await axios.get(palvelin + 'deck/one/' + deck_id);
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    return {
      status: error.response?.status,
      message: 'Failed to load deck: ' + error.message
    };
  }
};

export const addWordtoDeck = async ( deck_id , word) => {
    try {
    const response = await axios.post(palvelin + 'deck/' + deck_id + '/word', word,
    { headers: { 'Content-Type': 'application/json' } }
    );

    return (response);
  } catch (error) {
    return ({ status: error.status, message: 'Failed to add: ' + error.message });
  }
}

export const getWords = async () => {
  try {
    const response = await axios.get(palvelin + 'word/all');
    return (response);
  } catch (error) {
    return ({ status: error.status, message: 'Failed to load: ' + error.message });
  }
}

export const getWordsByDeck = async ( deck_id ) => {
  try {
    const response = await axios.get(palvelin + 'deck/' + deck_id + '/words');
    return (response);
  } catch (error) {
    return ({ status: error.status, message: 'Failed to load: ' + error.message });
  }
}

export const addDeck = async ( deck ) => {
  try {

    const response = await axios.post(palvelin + 'deck/add', deck, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    return (response);
  } catch (error) {
    return ({ status: error.status, message: 'Failed to add: ' + error.message });
  }
}

export const updateDeck = async (deck_id, deck) => {

  try {
    const response = await axios.put(palvelin + 'deck/update/' + deck_id, deck,
    { headers: { 'Content-Type': 'application/json' } }
    );
    return response;
  } catch (error) {
    return {
      status: error.response?.status,
      message: 'Failed to update: ' + error.message
    };
  }
};

export const deleteDeck = async (id) => {
  try {
    const response = await axios.delete(palvelin + 'deck/delete/' + id);
    return (response);
  } catch (error) {
    return ({ status: error.status, message: 'Failed to delete: ' + error.message });
  }
}

export const deleteWord = async (id) => {
  try {
    const response = await axios.delete(palvelin + 'word/delete/' + id);
    return (response);
  } catch (error) {
    return ({ status: error.status, message: 'Failed to delete: ' + error.message });
  }
}

export const getImages = async () => {
  try {
    const response = await axios.get(palvelin + 'deck/images');
    return (response);
  } catch (error) {
    return ({ status: error.status, message: 'Failed to load picture: ' + error.message });
  }
}
