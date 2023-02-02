import React, { useState, useEffect } from 'react';
import styles from './JokesList.module.css';

const JokesList = () => {
  const [jokes, setJokes] = useState([]);
  const [currentJoke, setCurrentJoke] = useState({});
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchJoke();
  }, []);

  const fetchJoke = () => {
    fetch('https://icanhazdadjoke.com/', { headers: { 'Accept': 'application/json' } })
      .then(response => response.json())
      .then(data => setCurrentJoke({ id: data.id, joke: data.joke, completed: false }));
  };

  const addToFavorites = () => {
    setFavorites([...favorites, currentJoke]);
    setJokes([...jokes, currentJoke]);
    fetchJoke();
  };

  const removeFromFavorites = jokeId => {
    setFavorites(favorites.filter(joke => joke.id !== jokeId));
  };

  return (
    <div className={styles.container}>
      <div className={styles.currentJoke}>
        {currentJoke.joke}
        <button onClick={addToFavorites} className={styles.favoriteButton}>
          Add to Favorites
        </button>
        <button onClick={fetchJoke} className={styles.nextButton}>
          Next Joke
        </button>
      </div>
      <FavoritesList favorites={favorites} removeFromFavorites={removeFromFavorites} />
    </div>
  );
};

const FavoritesList = ({ favorites, removeFromFavorites }) => {
  return (
    <div className={styles.favoritesContainer}>
      <h2>Favorites</h2>
      <ul>
        {favorites.map(joke => (
          <li key={joke.id}>
            {joke.joke}
            <button onClick={() => removeFromFavorites(joke.id)} className={styles.removeButton}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JokesList;
