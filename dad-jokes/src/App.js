import React, { Component } from "react";
import JokeCard from "../src/Components/JokeCard";
import JokesList from "../src/Components/JokesList";
import FavoritesList from "../src/Components/FavoritesList";
import AddJokeForm from "../src/Components/AddJokeForm";

class App extends Component {
  state = {
    jokes: [],
    favorites: []
  };

  addJoke = (newJoke) => {
    this.setState({ jokes: [newJoke, ...this.state.jokes] });
  };

  addToFavorites = (joke) => {
    this.setState({ favorites: [joke, ...this.state.favorites] });
  };

  render() {
    const { jokes, favorites } = this.state;
    return (
      <>
        <AddJokeForm addJoke={this.addJoke} />
        <JokeCard joke={jokes[0]} addToFavorites={this.addToFavorites} />
        <JokesList jokes={jokes.slice(1)} addToFavorites={this.addToFavorites} />
        <FavoritesList favorites={favorites} />
      </>
    );
  }
}

export default App;
