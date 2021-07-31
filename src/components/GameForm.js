import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
const rangeInclusive = require("range-inclusive");

class GameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [
        { name: "Player1", lives: 20, id: 1, gameOver: false },
        { name: "Player2", lives: 20, id: 2, gameOver: false },
      ],
      playerCount: 2,
      lives: 20,
      isEditing: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.playerCount > 2) {
      let playerNames = [];
      let players = rangeInclusive(1, this.state.playerCount, 1);
      for (let i = 0; i < players.length; i++) {
        let playerData = `name: "Player${players[i]}", lives: ${
          this.state.lives
        }, id: ${uuidv4()}, gameOver: ${false}`;
        playerNames.push({ playerData });
      }
      this.setState({
        players: [...playerNames],
      });
    }
    this.handleEdit();
    this.props.createGame({ ...this.state });
  }

  handleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  render() {
    let result;
    if (this.state.isEditing) {
      result = (
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
    } else {
      result = <button onClick={this.handleEdit}>Game Details</button>;
    }
    return result;
  }
}

export default GameForm;
