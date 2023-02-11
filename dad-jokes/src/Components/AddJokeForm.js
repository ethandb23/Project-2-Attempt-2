import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class AddJokeForm extends Component {
  state = {
    joke: ""
  };

  handleInputChange = (event) => {
    this.setState({ joke: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { joke } = this.state;
    if (joke.trim() !== "") {
      this.props.addJoke({ joke });
      this.setState({ joke: "" });
    }
  };

  render() {
    const { joke } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Add your own joke:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter joke"
            value={joke}
            onChange={this.handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Joke
        </Button>
      </Form>
    );
  }
}

export default AddJokeForm;
