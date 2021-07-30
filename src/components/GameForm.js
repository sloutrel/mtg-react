import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

class GameForm extends Component {
  constructor(props) {
    super(props);
    this.state = { lives: "20", playerCount: "2" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createGame({ ...this.state, id: uuidv4(), gameOver: false });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Number in the gathering:
          <input
            type="number"
            min="2"
            value={this.state.playerCount}
            onChange={(e) => {
              this.setState({ playerCount: e.target.value });
            }}
          ></input>
        </label>
        <label>
          Select your starting life value:{" "}
          <input
            type="number"
            max="40"
            min="10"
            step="10"
            value={this.state.lives}
            onChange={(e) => {
              this.setState({ lives: e.target.value });
            }}
          ></input>
        </label>
        <button>Let's battle!</button>
      </form>
    );
  }
}

export default GameForm;
