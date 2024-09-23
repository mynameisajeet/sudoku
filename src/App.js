import React, { useState } from 'react';
import sudoku from 'sudoku';
import './App.css';

function App() {
  const [puzzle, setPuzzle] = useState(sudoku.makepuzzle());
  const [solution, setSolution] = useState(sudoku.solvepuzzle(puzzle));
  const [userInput, setUserInput] = useState(Array(81).fill(null)); // Track user input
  const [difficulty, setDifficulty] = useState('easy'); // Difficulty state

  const handleChange = (e, row, col) => {
    const value = parseInt(e.target.value);
    const newInput = [...userInput];
    newInput[row * 9 + col] = value ? value - 1 : null;
    setUserInput(newInput);
  };

  const checkSolution = () => {
    const isCorrect = userInput.every((cell, index) => cell === solution[index]);
    alert(isCorrect ? 'Correct! 🎉' : 'Incorrect! Please try again.');
  };

  const provideHint = () => {
    const hintIndex = userInput.findIndex((cell) => cell === null); // Find the first empty cell
    if (hintIndex !== -1) {
      const newInput = [...userInput];
      newInput[hintIndex] = solution[hintIndex]; // Fill the hint in the user input
      setUserInput(newInput); // Update the state with the new input
    } else {
      alert('No more hints available! You filled all the cells.');
    }
  };

  const resetGame = () => {
    setPuzzle(sudoku.makepuzzle());
    setSolution(sudoku.solvepuzzle(puzzle));
    setUserInput(Array(81).fill(null)); // Reset user input
  };

  const startNewGame = () => {
    const newPuzzle = sudoku.makepuzzle(difficulty); // Generate a new puzzle based on difficulty
    setPuzzle(newPuzzle);
    setSolution(sudoku.solvepuzzle(newPuzzle));
    setUserInput(Array(81).fill(null)); // Reset user input
  };

  const renderPuzzle = () => {
    return puzzle.map((cell, index) => {
      const row = Math.floor(index / 9);
      const col = index % 9;
      const isInitial = cell !== null; // Check if the cell is part of the initial puzzle

      return (
        <input
          key={index}
          type="text"
          maxLength="1"
          className="sudoku-cell"
          value={userInput[index] !== null ? userInput[index] + 1 : (isInitial ? cell + 1 : "")} // Display user input or initial puzzle number
          onChange={(e) => handleChange(e, row, col)}
          readOnly={isInitial} // Make initial cells read-only
        />
      );
    });
  };

  return (
    <div className="App">
      <div><h1>Sudoku Game</h1></div>
      <div><h4>
        Select Difficulty:
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </h4></div>
      <div className="sudoku-board">
        {renderPuzzle()}
      </div>
      <button onClick={startNewGame}>Start New Game</button>
      <button onClick={checkSolution}>Check Solution</button>
      <button onClick={provideHint}>Hint</button>
      <button onClick={resetGame}>Reset Puzzle</button>
    </div>
  );
}

export default App;
