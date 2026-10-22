
import React, { Component } from "react";

import HangmanDrawing from "./components/HangmanDrawing";
import WordDisplay from "./components/WordDisplay";
import Keyboard from "./components/Keyboard";
import GameStats from "./components/GameStats";
import GameModal from "./components/GameModal";

import "./App.css";

const WORDS = [
  "REACT",
  "JAVASCRIPT",
  "COMPUTER",
  "PROGRAM",
  "COLLEGE",
  "KEYBOARD",
  "DEVELOPER",
  "FUNCTION",
  "VARIABLE",
  "COMPONENT"
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      word: this.getRandomWord(),
      guessedLetters: []
    };

    this.handleLetterClick = this.handleLetterClick.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
  }

  getRandomWord() {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex];
  }

  handleLetterClick(letter) {
    this.setState((previousState) => {
      const { word, guessedLetters } = previousState;

      const wrongGuesses = guessedLetters.filter(
        (guess) => !word.includes(guess)
      ).length;

      const hasWon = word.split("").every(
        (character) => guessedLetters.includes(character)
      );

      const hasLost = wrongGuesses >= 5;

      if (
        guessedLetters.includes(letter) ||
        hasWon ||
        hasLost
      ) {
        return null;
      }

      return {
        guessedLetters: [...guessedLetters, letter]
      };
    });
  }

  startNewGame() {
    this.setState({
      word: this.getRandomWord(),
      guessedLetters: []
    });
  }

  render() {
    const { word, guessedLetters } = this.state;

    const wrongGuesses = guessedLetters.filter(
      (letter) => !word.includes(letter)
    ).length;

    const hasWon = word.split("").every(
      (letter) => guessedLetters.includes(letter)
    );

    const hasLost = wrongGuesses >= 5;
    const gameOver = hasWon || hasLost;

    return (
      <div className="app">
        <div className="game-container">
          <h1>HANGMAN</h1>

          <div className="drawing-panel">
            <HangmanDrawing wrongGuesses={wrongGuesses} />

            <WordDisplay
              word={word}
              guessedLetters={guessedLetters}
              revealWord={hasLost}
            />
          </div>

          <Keyboard
            guessedLetters={guessedLetters}
            onLetterClick={this.handleLetterClick}
            gameOver={gameOver}
            word={word}
          />

          <p className="chosen-letters">
            Chosen Letters:{" "}
            {guessedLetters.length > 0
              ? guessedLetters.join(", ")
              : "None"}
          </p>

          <GameStats
            wrongGuesses={wrongGuesses}
            maxLives={5}
            onNewGame={this.startNewGame}
          />

          <GameModal
            isOpen={gameOver}
            hasWon={hasWon}
            word={word}
            onNewGame={this.startNewGame}
          />
        </div>
      </div>
    );
  }
}

export default App;
