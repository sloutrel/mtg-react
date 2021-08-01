import React, { Component } from "react";
import GameForm from "./GameForm";
import Player from "./Player";
// const _ = require("lodash");

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: [],
    };
    this.create = this.create.bind(this);
    // this.allPlayers = this.allPlayers.bind(this);
  }

  create(playerData) {
    this.setState({ game: [playerData] });
  }

  //   allPlayers(player) {
  //     <Player
  //       lives={players[key].lives}
  //       key={players[key].id}
  //       id={players[key].id}
  //       name={players[key].name}
  //     />;
  //   }

  //     const gameSetup = this.state.game;
  //     const players = gameSetup.players;
  //     for (let key in players) {
  //       if (players.hasOwnProperty(key)) {
  //         return (
  //           <Player
  //             lives={players[key].lives}
  //             key={players[key].id}
  //             id={players[key].id}
  //             name={players[key].name}
  //           />
  //         );
  //       }
  //     }
  //   }
  render() {
    // const game = this.state.game;
    // const mapPlayers = game.players;
    // const allPlayers = _.map(mapPlayers, (p, i) => {
    //   console.log(mapPlayers);
    //   return (
    //     <Player
    //       lives={mapPlayers[i].lives}
    //       key={mapPlayers[i].id}
    //       id={mapPlayers[i].id}
    //       name={mapPlayers[i].name}
    //       gameOver={mapPlayers[i].gameOver}
    //     />);

    const players = this.state.game.map((p) => {
      return p.allPlayers.map((player) => {
        console.log(player);
        return (
          <Player
            key={player.id}
            id={player.id}
            name={player.name}
            lives={player.lives}
          />
        );
      });
    });

    //     this.state.game, (e) => {
    //   e.players.map((player) => {
    //
    //  console.log(`mapPlayers ${mapPlayers}`);
    //   return _.map(p, (i) => {
    //     console.log(p);
    //     return (
    //       <Player
    //         lives={p.lives}
    //         key={i}
    //         id={p.id}
    //         name={p.name}
    //         gameOver={p.gameOver}
    //       />
    //     );
    //   });
    // });

    // const allPlayers = this.state.game.map((p, index) => {
    //   this.return(
    //     <div key={index}>
    //       {p.players.map((player, i) => (
    //         <Player
    //           lives={player.lives}
    //           key={player.id}
    //           id={player.id}
    //           name={player.name}
    //         />
    //       ))}
    //     </div>
    //   );
    // });
    // const allPlayers = this.state.game.map((p) => {
    //   const player = this.state.players[p];

    //   return (
    //     <Player
    //       lives={player.lives}
    //       key={p}
    //       id={player.id}
    //       name={player.name}
    //     />
    //   );
    // });

    // let allPlayers = Object.keys(this.state.game).map((playerKey, i) => {
    //   const playerData = this.state.game[playerKey].players;

    //   return Object.keys(playerData).map((player) => {
    //     return (
    //       <Player
    //         key={player.id}
    //         id={player.id}
    //         name={player.name}
    //         lives={player.lives}
    //       />
    //     );
    //   });
    // });

    return (
      <div>
        <GameForm createGame={this.create} />

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
