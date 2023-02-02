import React from "react";
import { Card, Button } from "react-bootstrap";

const JokeCard = ({ joke, addToFavorites }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Text>{joke.joke}</Card.Text>
        <Button onClick={() => addToFavorites(joke)}>Add to Favorites</Button>
      </Card.Body>
    </Card>
  );
};

export default JokeCard;
