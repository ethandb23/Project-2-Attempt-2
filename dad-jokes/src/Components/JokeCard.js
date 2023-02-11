import React, { Component } from "react";
import { Card } from "react-bootstrap";

class JokeCard extends Component {
  render() {
    const { joke } = this.props;
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Text>{joke?.joke}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default JokeCard;
