import React, { Component } from "react";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <div>Lives: {this.props.lives}</div>
        <button>+</button>
        <button>-</button>
      </div>
    );
  }
}

export default Player;
