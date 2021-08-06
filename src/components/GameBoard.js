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
  }

  create(gameData) {
    console.log(`create ${JSON.stringify(this.state)}`);
    this.setState(gameData);
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
    console.log(`preDown ${JSON.stringify(this.state)}`);
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
    console.log(`preGameOver ${JSON.stringify(this.state)}`);
    console.log(`loserLength ${this.state.losers.length}`);
    if (
      parseInt(this.state.losers.length) === parseInt(this.state.game.length)
    ) {
      this.winner();
    }
  }

  winner(id) {
    console.log(`preWinner ${JSON.stringify(this.state)}`);
    const game = this.state.game;

    const winnerArr = [];
    let winner;
    for (let i = 0; i < game.length; i++) {
      if (game[i].gameOver === false) {
        winnerArr.push(game[i].id);
        winner = winnerArr[0];
        console.log(`winner ${JSON.stringify(winnerArr)}`);
        console.log(`gameID ${JSON.stringify(game[i].id)}`);
      }
    }
    console.log(`Postwinner ${JSON.stringify(winner)}`);
    console.log(`game ${JSON.stringify(game)}`);

    Object.keys(game).map((p, i) => {
      console.log(`id ${JSON.stringify(game[i])}`);
      if (game[i].id === winner) {
        let quote = this.choice(this.props.winner);
        let tempState = game;
        tempState[i].gameOver = true;
        tempState[i].quote = quote;
        console.log(`End winner ${JSON.stringify(tempState[i])}`);
        console.log(`End winner ${JSON.stringify(tempState)}`);
        this.setState({ game: [...tempState] });
      }
      return null;
    });
  }

  render() {
    const players = this.state.game.map((player) => {
      return (
        <Player
          key={player.id}
          id={player.id}
          name={player.name}
          lives={player.lives}
          quote={player.quote}
          gameOver={player.gameOver}
          playerUp={this.lifeUp}
          playerDown={this.lifeDown}
        />
      );
    });

    return (
      <div>
        <GameForm createGame={this.create} level={this.props.difficulty} />

        <div className="Players">{players}</div>
        <button>Rematch</button>
        <button>New Battle</button>
        <a
          href="https://media.wizards.com/2021/downloads/MagicCompRules%2020210712.pdf"
          target="_blank"
          rel="noreferrer"
          className="GameBoard-rulebook"
        >
          CONSULT THE RULEBOOK
        </a>
      </div>
    );
  }
}

export default GameBoard;
