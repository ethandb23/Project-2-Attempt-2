import React, { useState, useEffect } from 'react';
import styles from './JokesList.module.css';
import favoritesStyles from './FavoritesList.module.css';

const JokesList = () => {
  const [jokes, setJokes] = useState([]);
  const [currentJoke, setCurrentJoke] = useState({});
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!jokes.length) {
      fetch('https://icanhazdadjoke.com/', { headers: { 'Accept': 'application/json' } })
        .then(response => response.json())
        .then(data => {
          setJokes([...jokes, { id: data.id, joke: data.joke }]);
          setCurrentJoke(data);
        });
    }
  }, [jokes]);

  const handleAddToFavorites = joke => {
    setFavorites([...favorites, joke]);
  };

  const handleDeleteFromFavorites = jokeId => {
    setFavorites(favorites.filter(joke => joke.id !== jokeId));
  };

  const handleNextJoke = () => {
    const nextJoke = jokes.find(joke => joke.id !== currentJoke.id);
    setCurrentJoke(nextJoke);
  };

  return (
    <div className={styles.container}>
      <div className={styles.joke}>
        <h2 className={styles.jokeText}>{currentJoke.joke}</h2>
        <div className={styles.buttons}>
          <button onClick={() => handleAddToFavorites(currentJoke)}>Add to favorites</button>
          <button onClick={handleNextJoke}>Next joke</button>
        </div>
      </div>
      <table className={favoritesStyles.favoritesTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Joke</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map(joke => (
            <tr key={joke.id}>
              <td>{joke.id}</td>
              <td>{joke.joke}</td>
              <td>
                <button onClick={() => handleDeleteFromFavorites(joke.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JokesList;
