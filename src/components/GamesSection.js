import React, { useState } from 'react';
import PuzzleGame from './PuzzleGame';
import LoveMaze from './MazeGame';

const GamesSection = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="games-section" style={{ position: 'fixed', bottom: 0, width: '100%', padding: '20px', backgroundColor: '#ffe6e6' }}>
      {!selectedGame ? (
        <>
          <h2>Choose a Game to Play</h2>
          <div className="game-buttons">
            <button onClick={() => setSelectedGame('puzzle')}>Puzzle</button>
            <button onClick={() => setSelectedGame('maze')}>Maze</button>
          </div>
        </>
      ) : (
        <div className="game-container">
          <button onClick={() => setSelectedGame(null)}>← Back to Games</button>
          {selectedGame === 'puzzle' && <PuzzleGame rows={4} cols={4} />}
          {selectedGame === 'maze' && <LoveMaze />}
        </div>
      )}
    </div>
  );
};

export default GamesSection;
