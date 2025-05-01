import './App.css';
import React, { useState } from 'react;'

// const wordList = (dictionary here)

function randomWord() {
  const index = Math.floor(Math.random())
  return words[index];
}

function App() {

  const numLives = 5
  // States
  const [word, setWord] = useState('');


  return (
    <div className="App">
      <h1>Hangman</h1>


      <div>
      {/* hangman drawing goes here */}

      </div>
      
      <div className="displayWord">
        <p>_____</p>
        
      </div>

     
      <div className="livesLeft">
        <p>1 life left</p>
      </div>

      <div className="guessedLetters">
        <p>guessed</p>

      </div>

     
      <div className="letters">
    
        <button>A</button>
        <button>B</button>
        <button>C</button>
  
      </div>

      
      <div className="message">
      
      </div>

  
      <button className="playAgain">Play Again</button>
    </div>
  );
}

export default App;
