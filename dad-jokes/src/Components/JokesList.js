import React, { Component } from 'react';
import styles from '../style/JokesList.module.css';

class JokesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      currentJoke: {},
      favorites: []
    };
  }

  // Fetch a new joke when the component mounts
  componentDidMount() {
    this.fetchJoke();
  }

  // Fetch a joke from the API and set it as the current joke
  fetchJoke = () => {
    fetch('https://icanhazdadjoke.com/', { headers: { 'Accept': 'application/json' } })
      .then(response => response.json())
      .then(data => this.setState({ currentJoke: { id: data.id, joke: data.joke, completed: false } }));
  };

  // Add the current joke to the favorites list and fetch a new joke
  addToFavorites = () => {
    const { favorites, currentJoke, jokes } = this.state;
    this.setState({
      favorites: [...favorites, currentJoke],
      jokes: [...jokes, currentJoke]
    });
    this.fetchJoke();
  };

  // Remove a joke from the favorites list by its ID
  removeFromFavorites = jokeId => {
    const { favorites } = this.state;
    this.setState({
      favorites: favorites.filter(joke => joke.id !== jokeId)
    });
  };

  render() {
    const { currentJoke, favorites } = this.state;

    return (
      <div className={styles.container}>
        {/* Display the current joke */}
        <div className={styles.currentJoke}>
          {currentJoke.joke}
          {/* Add the current joke to favorites */}
          <button onClick={this.addToFavorites} className={styles.favoriteButton}>
            Add to Favorites
          </button>
          {/* Fetch a new joke */}
          <button onClick={this.fetchJoke} className={styles.nextButton}>
            Next Joke
          </button>
        </div>
        {/* Display the favorites list */}
        <FavoritesList favorites={favorites} removeFromFavorites={this.removeFromFavorites} />
      </div>
    );
  }
}

// Component to display the favorites list
class FavoritesList extends Component {
  render() {
    const { favorites } = this.props;

    return (
      <div className={styles.favoritesContainer}>
        <h2>Favorites</h2>
        <ul>
          {/* Map over the favorites list and display each joke */}
          {favorites.map(joke => (
            <li key={joke.id}>
              {joke.joke}
              {/* Remove a joke from favorites */}
              <button onClick={() => this.props.removeFromFavorites(joke.id)} className={styles.removeButton}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default JokesList;
