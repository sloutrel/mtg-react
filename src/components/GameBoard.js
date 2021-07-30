import React, { Component } from "react";
import GameForm from "./GameForm";
import Player from "./Player";

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newGame: [],
    };
    this.create = this.create.bind(this);
  }

  create(newGameDetails) {
    this.setState({
      newGame: newGameDetails,
    });
  }
  render() {
    //     const players = this.state.newGame.map((player) => {
    //       return <Player lives={player.lives} key={player.id} id={player.id} />;
    //     });
    return (
      <div>
        <GameForm createGame={this.create} />
        <Player name="Sarah" lives={this.state.newGame.lives} />
        {/* <div className="Players">{players}</div> */}
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
