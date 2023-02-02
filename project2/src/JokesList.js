import React, { useState, useEffect } from 'react';
import styles from './JokesList.module.css';

const JokesList = () => {
  const [jokes, setJokes] = useState([]);
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);

  useEffect(() => {
    fetchJoke();
  }, []);

  const fetchJoke = () => {
    fetch('https://icanhazdadjoke.com/', { headers: { 'Accept': 'application/json' } })
      .then(response => response.json())
      .then(data => {
        setJokes([...jokes, data.joke]);
      });
  };

  const handleAddJoke = () => {
    fetchJoke();
  };

  const handleDeleteJoke = () => {
    setJokes(jokes.filter((joke, index) => index !== currentJokeIndex));
    setCurrentJokeIndex(currentJokeIndex - 1);
  };

  const handleNextJoke = () => {
    setCurrentJokeIndex(currentJokeIndex + 1);
  };

  return (
    <div className={styles.container}>
      <h2>{jokes[currentJokeIndex]}</h2>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleAddJoke}>
          Add to Favorite List
        </button>
        <button className={styles.button} onClick={handleDeleteJoke}>
          Delete Joke
        </button>
        <button className={styles.button} onClick={handleNextJoke}>
          Next Joke
        </button>
      </div>
    </div>
  );
};

export default JokesList;
