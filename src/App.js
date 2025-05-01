import './App.css';
import React, { useState, useEffect } from 'react';


function App() {

  const numLives = 5
  // States
  const [word, setWord] = useState('');
  const [wordList, setWordList] = useState([]);
  const [displayWord, setDisplayWord] = useState([]);

  useEffect(() => {
    fetch('/words.txt')
      .then(res => res.text())
      .then(text => {
        const wordList = text.split('\n').map(w => w.trim());
        setWordList(wordList);
  
        const newWord = wordList[Math.floor(Math.random() * wordList.length)];
        setWord(newWord);
        setDisplayWord(Array(newWord.length).fill('_'));
  
        console.log("Chosen word:", newWord);
        console.log("Display word:", Array(newWord.length).fill('_'));
      });
  }, []);
  

  function startGame() {

    const newWord =randomWord();
    setWord(newWord);
    setDisplayWord(Array(newWord.length).fill('_'));

  }

  function randomWord() {
    const index = Math.floor(Math.random() * wordList.length);
    return wordList[index];
  }


  return (
    <div className="App">
      <h1>Hangman</h1>


      <div>
      {/* hangman drawing goes here */}

      </div>
      
      <div className="displayWord">
        <p>{displayWord.join(' ')}</p>

        
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
