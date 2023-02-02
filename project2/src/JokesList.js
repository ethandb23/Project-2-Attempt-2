import React, { useEffect, useState } from 'react';
import JokeCard from './JokeCard';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from './favoritesSlice';

const JokesList = () => {
  const [joke, setJoke] = useState({});
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJoke = async () => {
      const response = await axios.get('https://api.chucknorris.io/jokes/random');
      setJoke(response.data);
    };
    fetchJoke();
  }, []);

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(joke));
  };

  const handleFetchJoke = () => {
    fetchJoke();
  };

  return (
    <div>
      <JokeCard joke={joke} />
      <button onClick={handleAddToFavorites}>Add to Favorites</button>
      <button onClick={handleFetchJoke}>Next Joke</button>
    </div>
  );
};

export default JokesList;
