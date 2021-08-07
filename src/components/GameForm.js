import "./GameForm.css";
import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
const rangeInclusive = require("range-inclusive");

class GameForm extends Component {
  static defaultProps = {
    difficulty: [
      { level: 10, key: 10, name: "Sudden Death" },
      { level: 20, key: 20, name: "Standard Mode" },
      { level: 30, key: 30, name: "Longevity Mode" },
      { level: 40, key: 40, name: "N00b" },
    ],
    lives: [],
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
    this.forceUpdate = this.forceUpdate.bind(this);
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
      allPlayers,
    });

    this.handleEdit();
  }

  newGame() {
    this.setState({
      playerCount: 2,
      startLives: 20,
      isEditing: true,
    });
  }

  handleEdit() {
    console.log(this.state);
    this.forceUpdate();
    this.setState({ isEditing: !this.state.isEditing });
  }

  render() {
    let result;
    if (this.state.isEditing) {
      result = (
        <form className="GameForm" onSubmit={this.handleSubmit}>
          <div className="GameForm-playerCount">
            <label>
              Number in the gathering:
              <input
                autoFocus
                className="GameForm-playerCount-input"
                type="number"
                min="2"
                value={this.state.playerCount}
                onChange={(e) => {
                  this.setState({ playerCount: e.target.value });
                }}
              ></input>
            </label>
          </div>
          <div className="GameForm-lifeCount">
            <label>
              Select your starting life value:{" "}
              <input
                className="GameForm-lifeCount-input"
                id="lives"
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
          </div>
          <div className="submit-div">
            <button className="GameForm-submit">Onward to battle!</button>
          </div>{" "}
        </form>
      );
    } else {
      let level = [];
      if (this.state.startLives) {
        let difficulty = this.props.difficulty;
        let initLives = parseInt(this.state.startLives);
        for (let i = 0; i < difficulty.length; i++) {
          if (difficulty[i].level === initLives) {
            level.push(difficulty[i].name);
          }
        }
      }
      result = (
        <div>
          <span className="level">{level.toString()}</span>
          <button className="GameForm-edit-button" onClick={this.handleEdit}>
            Halt, I've made a mistake
          </button>
        </div>
      );
    }
    return result;
  }
}
export default GameForm;
