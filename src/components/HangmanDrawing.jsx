import React, {Component} from 'react';

class HangmanDrawing extends Component {
    render() {
        const { wrongGuesses } = this.props;

        return (
            <div className="hangman-drawing">
                <img src={`/hangman/hangman-${wrongGuesses}.svg`} alt={`Hangman stage ${wrongGuesses}`} 
                />
            </div>
        );
    }

}

export default HangmanDrawing;

//we are using wrongGuesses prop through a child compopnent and updates image not the actual number of guesses 
