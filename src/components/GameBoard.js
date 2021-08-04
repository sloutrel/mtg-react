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

  create(playerData) {
    const allPlayers = playerData.allPlayers;
    this.setState({ game: [...allPlayers] });
  }

  // winner() {
  //   const game = this.state.game;
  //   const winner = [];
  //   for (let i = 0; i < game.length; i++) {
  //     if (!game[i].gameOver) {
  //       winner.push(game[i].id);

  //       if (winner.length === 1) {
  //         let quote = this.choice(this.props.winner);
  //         this.setState({ ...game[i], quote: quote });
  //       }
  //     }
  //   }
  //   console.log(`winArr ${winner}`);
  // }
  loser(id, lives) {
    console.log(this.state.losers);
    const total = [];
    const allLosers = this.state.game.map((player) => {
      if (player.id === id && player.lives === 0) {
        total.push(player.id);
      }

      return total;
    });

    // console.log(`total ${[...total]}`);
    const curLosers = this.state.losers;
    console.log(`allLosers ${allLosers.length}`);
    console.log(`curLosers ${curLosers}`);
    let all = curLosers + allLosers.length;
    this.setState({ losers: all }, () => {
      // console.log(this.state.losers.length);
      this.isGameOver();
    });
  }

  isGameOver() {
    console.log(`slength ${this.state.losers.length}`);
    // console.log(this.state.losers);

    // console.log(this.state.game.length - 1);

    if (
      parseInt(this.state.losers.length) ===
      parseInt(this.state.game.length) - 1
    ) {
      // console.log("post loser");
      this.winner();
    }
  }

  winner(id) {
    console.log(`losers ${this.state.losers.length}`);
    const game = this.state.game;
    const win = game.map((player) => {
      for (let i = 0; i < this.state.loser.length; i++) {
        if (player.id === id) {
          if (player.id !== this.state.loser[i]) {
            let quote = this.choice(this.props.winner);
            return { ...player, quote: quote, gameOver: true };
          }
        }
      }

      // if (!player.gameOver) {
      //   let quote = this.choice(this.props.winner);
      //   return { ...player, quote: quote, gameOver: true };
      // }
      return player;
    });

    this.setState({ game: win });
  }

  choice(arr) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  lifeUp(id, lives) {
    const up = this.state.game.map((player) => {
      if (player.id === id) {
        parseInt(lives);
        lives = lives + 1;
        return { ...player, lives: lives };
      }
      return player;
    });
    this.setState({ game: up });
  }

  lifeDown(id, lives) {
    console.log(this.state.losers);
    // const losers = [];
    const down = this.state.game.map((player) => {
      if (player.id === id) {
        if (lives > 1) {
          lives = lives - 1;
          return { ...player, lives: lives };
        } else if (lives === 1) {
          lives = lives - 1;
          let quote = this.choice(this.props.loser);
          return { ...player, lives: lives, gameOver: true, quote: quote };
        }
      }
      return player;
    });
    // if (losers.length === this.state.game.length - 1) {
    //   this.winner(id);
    // }
    this.setState({ game: down }, (id, lives) => {
      this.loser(id, lives);
    });
    // this.winner(id, lives);
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
