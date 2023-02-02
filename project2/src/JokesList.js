import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./JokesList.module.css";

const JokesList = () => {
  const [joke, setJoke] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getJoke();
  }, []);

  const getJoke = async () => {
    setLoading(true);
    const res = await axios.get("https://icanhazdadjoke.com", {
      headers: { Accept: "application/json" },
    });
    setJoke(res.data);
    setLoading(false);
  };

  const addToFavorites = () => {
    setFavorites([...favorites, joke]);
  };

  const removeFromFavorites = (jokeToRemove) => {
    setFavorites(favorites.filter((j) => j.id !== jokeToRemove.id));
  };

  return (
    <div className={styles.jokesContainer}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className={styles.displayedJoke}>
            <p>{joke.joke}</p>
          </div>
          <div className={styles.buttonsContainer}>
            <button onClick={addToFavorites}>Add to Favorites</button>
            <button onClick={getJoke}>Next Joke</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JokesList;
