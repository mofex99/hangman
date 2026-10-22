import React, {Component} from 'react';

class WordDisplay extends Component {
    render() {
        const { word, guessedLetters, revealWord } = this.props;

        return (
            <div className="word-display">
                {word.split("").map((letter, index) => (
                    <span className="letter-box" key={index}>
                        {guessedLetters.includes(letter) || revealWord ? letter : "_"}
                    </span>
                ))}
            </div>
        );
    }
}

export default WordDisplay;

// We using map to render each letter and include to check if its been guessed but the original word isnt modified
