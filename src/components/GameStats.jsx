
import React, { Component } from "react";

class GameStats extends Component {
  render() {
    const { wrongGuesses, maxLives, onNewGame } = this.props;
    const remainingLives = maxLives - wrongGuesses;

    return (
      <div className="game-stats">
        <div className="stat-group">
          <h3>WRONG GUESSES</h3>

          <div className="stat-boxes">
            {Array.from({ length: maxLives }, (_, index) => (
              <span
                key={index}
                className={
                  index < wrongGuesses
                    ? "stat-box wrong"
                    : "stat-box"
                }
              />
            ))}
          </div>
        </div>

        <button
          className="new-game-button"
          onClick={onNewGame}
        >
          NEW GAME
        </button>

        <div className="stat-group">
          <h3>LIVES</h3>

          <div className="stat-boxes">
            {Array.from({ length: maxLives }, (_, index) => (
              <span
                key={index}
                className={
                  index < remainingLives
                    ? "stat-box alive"
                    : "stat-box"
                }
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default GameStats;

// This will show us the wrong guesses on the left and the new game button on the middle and the lives on the right 
