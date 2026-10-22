
import React, { Component } from "react";

class GameModal extends Component {
  render() {
    const { isOpen, hasWon, word, onNewGame } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <div className="modal-overlay">
        <div
          className="modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="game-result"
        >
          <h2 id="game-result">
            {hasWon ? "YOU WON!" : "GAME OVER!"}
          </h2>

          <p>
            {hasWon
              ? "Congratulations! You guessed the word!"
              : `You lost! The word was ${word}.`}
          </p>

          <button onClick={onNewGame}>
            PLAY AGAIN
          </button>
        </div>
      </div>
    );
  }
}

export default GameModal;

// this is the popup that shows over the game when you win or lose 
