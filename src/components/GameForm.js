import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
const rangeInclusive = require("range-inclusive");

class GameForm extends Component {
  static defaultProps = {
    difficulty: {
      10: "Sudden Death",
      20: "Standard Mode",
      30: "Longevity Mode",
      40: "N00b",
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      playerCount: 2,
      startLives: 20,
      isEditing: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const allPlayers = [];
    const playerNum = rangeInclusive(1, this.state.playerCount, 1);
    for (let i = 0; i < playerNum.length; i++) {
      allPlayers.push({
        name: playerNum[i],
        id: uuidv4(),
        gameOver: false,
        lives: this.state.startLives,
      });
    }
    this.props.createGame({
      game: allPlayers
    });
    this.handleEdit();
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
              value={this.state.startLives}
              onChange={(e) => {
                this.setState({ startLives: e.target.value });
              }}
            ></input>
          </label>
          <button>Let's battle!</button>
        </form>
      );
    } else {
      // const lifeNum = this.state.startLives;
      // const quoteNum = this.props.difficulty;
      // const diffQuote = [];

      // if (lifeNum === quoteNum.lifeNum) {
      //   diffQuote.push(lifeNum);
      // }
      result = <button onClick={this.handleEdit}>Game Details </button>;
    }
    return result;
  }
}

export default GameForm;
