
import React, { Component } from "react";

class Keyboard extends Component {

  render() {

    const {
      guessedLetters,
      onLetterClick,
      gameOver,
      word
    } = this.props;

    const rows = [
      "QWERTYUIOP",
      "ASDFGHJKL",
      "ZXCVBNM"
    ];

    return (
        
      <div className="keyboard">
        {rows.map((row, index) => (
          <div className="keyboard-row" key={index}>
            {row.split("").map((letter) => {
              const guessed = guessedLetters.includes(letter);
              const correct = word.includes(letter);

              let className = "key-button";

              if (guessed) {
                className += correct ? " correct" : " incorrect";
              }

              return (
                <button
                  key={letter}
                  className={className}
                  disabled={guessed || gameOver}
                  onClick={() => onLetterClick(letter)}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
}

export default Keyboard;
