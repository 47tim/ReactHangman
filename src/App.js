import './App.css';
import React, { useState, useEffect } from 'react';


const hangmanStages = [

  `
    +---+
    |   |
    O   |
   /|\\  |
   / \\  |
        |
  =========
  `,

  `
    +---+
    |   |
    O   |
   /|\\  |
   /    |
        |
  =========
  `,

  `
    +---+
    |   |
    O   |
   /|\\  |
        |
        |
  =========
  `,

  `
    +---+
    |   |
    O   |
   /|   |
        |
        |
  =========
  `,
 
  `
    +---+
    |   |
    O   |
    |   |
        |
        |
  =========
  `,
 
  `
    +---+
    |   |
    O   |
        |
        |
  =========
  `
];


function App() {

  const numLives = 5;
  const [word, setWord] = useState('');
  const [wordList, setWordList] = useState([]);
  const [displayWord, setDisplayWord] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [livesLeft, setLivesLeft] = useState(numLives);
  const [endGame, setEndGame] = useState(false);
  
  
  useEffect(() => {
    fetch('/words.txt')
      .then(res => res.text())
      .then(text => {
        const wordList = text.split('\n').map(w => w.trim().toUpperCase());
        setWordList(wordList);
  
        const newWord = wordList[Math.floor(Math.random() * wordList.length)];
        setWord(newWord);
        setDisplayWord(Array(newWord.length).fill('_'));
      });
  }, []);

  function startGame() {
    const newWord = randomWord();
    setWord(newWord);
    setDisplayWord(Array(newWord.length).fill('_'));
    setGuessedLetters(new Set());
    setLivesLeft(numLives);
  }

  function randomWord() {
    const index = Math.floor(Math.random() * wordList.length);
    return wordList[index];
  }

  function handleLetterClick(letter) {
    if (guessedLetters.has(letter)) return;

    const updatedGuessed = new Set(guessedLetters);
    updatedGuessed.add(letter);
    setGuessedLetters(updatedGuessed);

    if (word.includes(letter)) {
      const updatedDisplay = [...displayWord];
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          updatedDisplay[i] = letter;
        }
      }
      setDisplayWord(updatedDisplay);
    } else {
      setLivesLeft(prev => {
        const updatedLives = prev - 1;
        if (updatedLives === 0) {
          setEndGame(true);
        }
        return updatedLives;
      });
    }
    
  }

  function isDisabled(letter) {
    return guessedLetters.has(letter) || endGame;
  }

  function getButtonStyle(letter) {
    return isDisabled(letter) ? {
      backgroundColor: '#ccc',
      color: '#888',
      cursor: 'not-allowed'
    } : {};
  } 

  return (
    <div className="App">
      <h1>Hangman</h1>

      <div className="hangmanArt">
        <pre>{hangmanStages[livesLeft]}</pre>
      </div>
      
      <div className="displayWord">
        <p>{displayWord.join(' ')}</p>
      </div>

      <div className="livesLeft">
        <p>{livesLeft} {livesLeft === 1 ? 'life' : 'lives'} left</p>
      </div>

      <div className="guessedLetters">
        <p>Guessed: {[...guessedLetters].join(', ')}</p>
      </div>

      <div className="letters">
        <div className="row">
          {'QWERTYUIOP'.split('').map(letter => (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              disabled={isDisabled(letter)}
              style={getButtonStyle(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="row">
          {'ASDFGHJKL'.split('').map(letter => (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              disabled={isDisabled(letter)}
              style={getButtonStyle(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="row">
          {'ZXCVBNM'.split('').map(letter => (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              disabled={isDisabled(letter)}
              style={getButtonStyle(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      <div className="message">
        {/* win/lose message */}
      </div>

      <button className="playAgain" onClick={startGame}>Play Again</button>
    </div>
  );
}

export default App;