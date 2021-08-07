import React, { Component } from "react";
import GameForm from "./GameForm";
import Player from "./Player";
class GameBoard extends Component {
  static defaultProps = {
    loser: [
      "Total Annihilation",
      "Utter Defeat",
      "Conquered",
      "Bloodbath",
      "It was a Massacre",
    ],
    winner: [
      "Always Victorious",
      "Glorified Victory",
      "Triumphant Conquest",
      "Enemies Vanquished",
      "Rejoice in Your Glory",
    ],
  };
  constructor(props) {
    super(props);
    this.state = {
      game: [],
      losers: 0,
    };
    this.create = this.create.bind(this);
    this.lifeUp = this.lifeUp.bind(this);
    this.lifeDown = this.lifeDown.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  create(playerData) {
    console.log(`create ${JSON.stringify(this.state)}`);
    const allPlayers = playerData.allPlayers;
    this.setState({ game: [...allPlayers] });
  }

  newGame() {
    this.refs.gameForm.handleEdit();
    this.refs.gameForm.newGame();
    this.setState({ game: [], losers: 0, over: !this.state.over });
  }

  choice(arr) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  lifeUp(id, lives) {
    const up = this.state.game.map((player) => {
      if (player.id === id) {
        let oneMoreLife = parseInt(lives);
        oneMoreLife = oneMoreLife + 1;
        return { ...player, lives: oneMoreLife };
      }
      return player;
    });
    this.setState({ game: up });
  }

  lifeDown(id, lives) {
    let losers = "";
    const down = this.state.game.map((player) => {
      if (player.id === id) {
        if (lives > 1) {
          lives = lives - 1;
          return { ...player, lives: lives };
        } else if (lives === 1) {
          lives = lives - 1;
          let quote = this.choice(this.props.loser);
          losers += 1;
          return { ...player, lives: lives, gameOver: true, quote: quote };
        }
      }
      return player;
    });
    this.setState(
      { game: down, losers: this.state.losers + losers },
      (id, lives) => {
        this.isGameOver(id, lives);
      }
    );
  }

  isGameOver() {
    if (
      parseInt(this.state.losers.length) === parseInt(this.state.game.length)
    ) {
      this.winner();
    }
  }

  winner(id) {
    const game = this.state.game;
    const winnerArr = [];
    let winner;
    for (let i = 0; i < game.length; i++) {
      if (game[i].gameOver === false) {
        winnerArr.push(game[i].id);
        winner = winnerArr[0];
      }
    }

    Object.keys(game).map((p, i) => {
      console.log(`id ${JSON.stringify(game[i])}`);
      if (game[i].id === winner) {
        let quote = this.choice(this.props.winner);
        let tempState = game;
        tempState[i].gameOver = true;
        tempState[i].quote = quote;
        tempState[i].winner = true;
        this.setState({ game: [...tempState] });
      }
      console.log(game);
      return this.gameIsOver();
    });
  }

  gameIsOver() {
    this.setState({ over: true });
  }

  render() {
    const players = this.state.game.map((player) => {
      return (
        <div className="col-md-4 col-sm-6 col-lg-3">
          <Player
            key={player.id}
            id={player.id}
            name={player.name}
            lives={player.lives}
            quote={player.quote}
            winner={player.winner}
            gameOver={player.gameOver}
            playerUp={this.lifeUp}
            playerDown={this.lifeDown}
          />
        </div>
      );
    });
    let newGame;
    if (this.state.over) {
      newGame = <button onClick={this.newGame}>Rematch</button>;
    }
    return (
      <div>
        <GameForm ref="gameForm" createGame={this.create} />
        <div className="container">
          <div className="row justify-content-center">{players}</div>
        </div>
        <div>{newGame}</div>
      </div>
    );
  }
}

export default GameBoard;
