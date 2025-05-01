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
  const [definitions, setDefinitions] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  
  useEffect(() => {
    fetch('/words.txt')
    .then(res => res.text())
    .then(text => {
      const wordList = text
        .split('\n')
        .map(line => line.trim().split('|')[0].toUpperCase())
        .filter(w => w.length > 0 && /^[A-Z]+$/.test(w));
        
      setWordList(wordList);

      const newWord = wordList[Math.floor(Math.random() * wordList.length)];
      setWord(newWord);
      setDisplayWord(Array(newWord.length).fill('_'));
    });


    fetch('/definitions.txt')
    .then(res => res.text())
    .then(text => {
      const lines = text.split('\n');
      const defMap = {};
      for (const line of lines) {
        const parts = line.trim().split('|');
        if (parts.length >= 3) {
          const word = parts[0].toUpperCase();
          const pos = parts[1];
          const definition = parts[2];
          defMap[word] = { pos, definition };
        }
      }
      setDefinitions(defMap);
    });
    


  }, []);


  function handleLogin(e) {
    e.preventDefault();
    // Basic hardcoded auth
    if (username === 'user' && password === 'pass') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h2>Login to Play Hangman</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username: </label>
            <input value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  function startGame() {
    const newWord = randomWord();
    setWord(newWord);
    setDisplayWord(Array(newWord.length).fill('_'));
    setGuessedLetters(new Set());
    setLivesLeft(numLives);
    setEndGame(false);
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

      {endGame && (
        <div className="popup">
          <div className="popup-content">
            <h2>You lost!</h2>
            <p><strong>Word:</strong> {word}</p>
            {definitions[word] && (
              <>
                <p><strong>Part of speech:</strong> {definitions[word].pos}</p>
                <p><strong>Definition:</strong> {definitions[word].definition}</p>
              </>
            )}
            <button onClick={startGame}>Try Again</button>
          </div>
        </div>
      )}
  

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