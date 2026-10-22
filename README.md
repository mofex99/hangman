# Hangman Game

A Hangman game created with React and Vite. Players can guess letters to reveal a hidden word while trying to avoid five incorrect guesses.

## Description

This project is a browser based Hangman game created as a React class components assignment. A random word is selected at the start of each game, and the player uses an  QWERTY keyboard to guess its letters.

Correct guesses reveal letters in the word. Incorrect guesses advance the Hangman drawing and reduce the player's remaining chances. The game ends when the player guesses every letter or reaches five incorrect guesses.

## Features

- Random word selection
- Interactive QWERTY keyboard
- Correct and incorrect letter styling
- Six progressive Hangman SVG images
- Frowning Hangman character
- Five incorrect guesses allowed
- Chosen-letter history
- Remaining-lives indicators
- Win and loss result modal
- New Game and Play Again controls
- Responsive layout for smaller screens
- Docker and Docker Compose support

## Technologies

- [React](https://react.dev/)
- JavaScript
- JSX
- CSS
- [Vite](https://vite.dev/)
- Docker
- Docker Compose

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js
- npm
- Docker Desktop, if you want to use the Docker setup

### Installation

1. Clone or download this repository.

2. Open a terminal in the project directory:

   ```bash
   cd hangman
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in the terminal. It is usually:

   ```text
   http://localhost:5173
   ```

## Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates an optimized production build |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Checks the project with ESLint |

## How to Play

1. Start a game.
2. Look at the blank spaces representing the hidden word.
3. Click a letter on the on-screen keyboard.
4. Correct guesses reveal matching letters.
5. Incorrect guesses add another part to the Hangman drawing.
6. You can make up to five incorrect guesses.
7. Guess every letter to win.
8. Use **New Game** or **Play Again** to reset the game.


## Docker Setup

Make sure Docker Desktop is running, then build and start the application:

```bash
docker compose up --build
```

Open the application at:

```text
http://localhost:3000
```

Stop the containers with:

```bash
docker compose down
```

## AI Contribution

See [`AI_CONTRIBUTION.md`](./AI_CONTRIBUTION.md) for the tools used, prompts, testing notes, and reflection on the development process.

## Author

Mofetoluwa Sam-Adelusimo  
Morehouse College

## License

Educational project.
