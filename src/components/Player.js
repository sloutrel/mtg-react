import React, { Component } from "react";
import "./Player.css";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLifeDown = this.handleLifeDown.bind(this);
    this.handleLifeUp = this.handleLifeUp.bind(this);
    this.choice = this.choice.bind(this);
  }

  handleLifeUp() {
    this.props.playerUp(this.props.id, this.props.lives);
  }

  handleLifeDown() {
    this.props.playerDown(this.props.id, this.props.lives);
  }

  choice(arr) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  render() {
    let result;
    if (this.props.gameOver) {
      if (this.props.winner) {
        result = (
          <div className="Player">
            <h1>{`Player ${this.props.name}`}</h1>
            <div>Lives: {this.props.lives}</div>
            <h2 className="winner">{this.props.quote}</h2>
          </div>
        );
      } else {
        result = (
          <div className="Player">
            <h1>{`Player ${this.props.name}`}</h1>
            <div>Lives: {this.props.lives}</div>
            <h2 className="loser">{this.props.quote}</h2>
          </div>
        );
      }
    } else {
      result = (
        <div className="Player">
          <h1>{`Player ${this.props.name}`}</h1>
          <div>Lives: {this.props.lives}</div>
          <button className="button-plus" onClick={this.handleLifeUp}>
            +
          </button>
          <button className="button-minus" onClick={this.handleLifeDown}>
            -
          </button>
        </div>
      );
    }
    return (
      <div className="Player-div">
        <div className="Player-card">{result}</div>
      </div>
    );
  }
}

export default Player;
