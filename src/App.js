import './App.css';

function App() {
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
