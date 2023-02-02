import React, { useState, useEffect } from 'react';
import styles from './JokesList.module.css';

const JokesList = () => {
  const [joke, setJoke] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('https://icanhazdadjoke.com/', { headers: { 'Accept': 'application/json' } })
      .then(response => response.json())
      .then(data => setJoke(data.joke));
  }, []);

  const addToFavorites = () => {
    setFavorites([...favorites, joke]);
    setJoke('');
  };

  const deleteJoke = () => {
    setJoke('');
  };

  return (
    <div>
      <h1>{joke}</h1>
      <button onClick={addToFavorites}>Add to Favorites</button>
      <button onClick={deleteJoke}>Delete</button>
      <h2>Favorites:</h2>
      <ul>
        {favorites.map((favorite, index) => (
          <li key={index}>{favorite}</li>
        ))}
      </ul>
    </div>
  );
};

export default JokesList;
