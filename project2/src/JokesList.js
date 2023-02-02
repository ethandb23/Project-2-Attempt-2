import React, { useState, useEffect } from 'react';
import styles from './JokesList.module.css';

const JokesList = () => {
  const [jokes, setJokes] = useState([]);
  const [newJoke, setNewJoke] = useState('');

  useEffect(() => {
    fetch('https://icanhazdadjoke.com/', { headers: { 'Accept': 'application/json' } })
      .then(response => response.json())
      .then(data => setJokes([...jokes, { id: data.id, joke: data.joke, completed: false }]));
  }, [jokes]);

  const handleChange = event => {
    setNewJoke(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setJokes([...jokes, { id: jokes.length + 1, joke: newJoke, completed: false }]);
    setNewJoke('');
  };

  const toggleComplete = jokeId => {
    setJokes(
      jokes.map(joke => {
        if (joke.id === jokeId) {
          return { ...joke, completed: !joke.completed };
        }
        return joke;
      })
    );
  };

  const handleEdit = (jokeId, updatedJoke) => {
    setJokes(
      jokes.map(joke => {
        if (joke.id === jokeId) {
          return { ...joke, joke: updatedJoke };
        }
        return joke;
      })
    );
  };

  const handleDelete = jokeId => {
    setJokes(jokes.filter(joke => joke.id !== jokeId));
  };

  const clearCompleted = () => {
    setJokes(jokes.filter(joke => !joke.completed));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newJoke} onChange={handleChange} />
        <button type="submit">Add Joke</button>
      </form>
      <ul>
        {jokes.map(joke => (
          <li key={joke.id}>
            {joke.joke}{' '}
            <input
              type="checkbox"
              checked={joke.completed}
              onChange={() => toggleComplete(joke.id)}
            />{' '}
            <button onClick={() => handleEdit(joke.id, prompt('Edit joke'))}>
              Edit
            </button>{' '}
            <button onClick={() => handleDelete(joke.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={clearCompleted}>Clear Completed</button>
    </div>
  );
};

export default JokesList;
