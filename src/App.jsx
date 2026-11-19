
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
      guessedLetters: [],
      player: null,
      isLoggedIn: false,
      playerNameInput: "",
      loginError: "",
      isSavingResult: false,
      gameResultSaved: false,
      saveError: "",
    };

    this.handleLetterClick = this.handleLetterClick.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  getRandomWord() {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex];
  }

  handleLetterClick(letter) {
    if (!this.state.isLoggedIn || this.state.isSavingResult) {
      return;
    }

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
    if (this.state.isSavingResult) {
      return;
    }

    this.setState({
      word: this.getRandomWord(),
      guessedLetters: [],
      gameResultSaved: false,
      saveError: "",
    });
  }

  async handleLogin() {
    const playerName = this.state.playerNameInput.trim();

    if (!playerName) {
      this.setState({
        loginError: "Please enter your name.",
      });
      return;
    }

    this.setState({ loginError: "" });

    try {
      const response = await fetch(
        `http://localhost:3001/api/players?playerName=${encodeURIComponent(playerName)}`
      );

      let player;

      if (response.ok) {
        // Existing player
        player = await response.json();
      } else if (response.status === 404) {
        // New player
        const createResponse = await fetch(
          "http://localhost:3001/api/players",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ playerName }),
          }
        );

        if (!createResponse.ok) {
          throw new Error("Failed to create player");
        }

        player = await createResponse.json();
      } else {
        throw new Error("Failed to look up player");
      }

      this.setState({
        player,
        isLoggedIn: true,
        loginError: "",
      });
    } catch (error) {
      console.error("Login error:", error);

      this.setState({
        loginError: "Unable to log in. Please try again.",
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { word, guessedLetters, isLoggedIn, gameResultSaved } = this.state;

    const wrongGuesses = guessedLetters.filter(
      (letter) => !word.includes(letter)
    ).length;

    const hasWon = word.split("").every(
      (letter) => guessedLetters.includes(letter)
    );

    const hasLost = wrongGuesses >= 5;
    const gameOver = hasWon || hasLost;

    const previousWrongGuesses = prevState.guessedLetters.filter(
      (letter) => !prevState.word.includes(letter)
    ).length;

    const previouslyWon = prevState.word.split("").every(
      (letter) => prevState.guessedLetters.includes(letter)
    );

    const previouslyLost = previousWrongGuesses >= 5;
    const previouslyGameOver = previouslyWon || previouslyLost;

    if (
      isLoggedIn &&
      gameOver &&
      !previouslyGameOver &&
      !gameResultSaved
    ) {
      this.saveGameResult(hasWon);
    }
  }

  async saveGameResult(hasWon) {
    const { player } = this.state;

    if (!player || this.state.isSavingResult || this.state.gameResultSaved) {
      return;
    }

    this.setState({
      isSavingResult: true,
      gameResultSaved: true,
      saveError: "",
    });

    const updatedWins = player.wins + (hasWon ? 1 : 0);
    const updatedLosses = player.losses + (hasWon ? 0 : 1);

    try {
      const response = await fetch(
        `http://localhost:3001/api/players/${encodeURIComponent(player.playerID)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wins: updatedWins,
            losses: updatedLosses,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update player statistics");
      }

      const updatedPlayer = await response.json();

      this.setState({
        player: updatedPlayer,
        isSavingResult: false,
      });
    } catch (error) {
      console.error("Error saving game result:", error);

      this.setState({
        isSavingResult: false,
        saveError: "Failed to save game result. Please refresh and check your stats.",
      });
    }
  }

  render() {
    const {
      word,
      guessedLetters,
      player,
      isLoggedIn,
      playerNameInput,
      loginError,
      isSavingResult,
      saveError,
    } = this.state;

    const wrongGuesses = guessedLetters.filter(
      (letter) => !word.includes(letter)
    ).length;

    const hasWon = word.split("").every(
      (letter) => guessedLetters.includes(letter)
    );

    const hasLost = wrongGuesses >= 5;
    const gameOver = hasWon || hasLost;

    const totalGames = player
      ? player.wins + player.losses
      : 0;

    const winPercentage = totalGames === 0
      ? "0.0"
      : ((player.wins / totalGames) * 100).toFixed(1);

    return (
      <div className="app">
        <div className="game-container">
          <h1>HANGMAN</h1>

          {/* Login section */}
          {!isLoggedIn && (
            <div className="login-container">
              <input
                type="text"
                placeholder="Enter your player name"
                value={playerNameInput}
                onChange={(event) =>
                  this.setState({
                    playerNameInput: event.target.value
                  })
                }
              />

              <button type="button" onClick={this.handleLogin}>
                Login
              </button>

              {loginError && (
                <p className="login-error">
                  {loginError}
                </p>
              )}
            </div>
          )}

          {/* Player information section */}
          {isLoggedIn && player && (
            <div className="player-info">
              <h2>Welcome, {player.playerName}!</h2>

              <p>Wins: {player.wins}</p>
              <p>Losses: {player.losses}</p>
              <p>Win Percentage: {winPercentage}%</p>
            </div>
          )}

          {isSavingResult && (
            <p>Saving game result...</p>
          )}

          {saveError && (
            <p className="save-error">{saveError}</p>
          )}

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
            gameOver={gameOver || !isLoggedIn || isSavingResult}
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

// buy a vowel feature and take away 2 lives 
// change how the two game lives and wrong guesses are implemented 
// create a button that says buy a vowel 
// jsx on click function so that when its pressed it will take away 2 lives from user lives variable 
// loop through the hidden word and reveal the first vowel i see so do a ternary operator to check if letter is vowel 
// also create a list with all vowels 
// update my changes with a set state for the new lives and the new guessed letters
