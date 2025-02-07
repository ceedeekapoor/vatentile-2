import React from 'react';
import '../styles/loveMaze.css';

const Maze = ({ maze, startImage, endImage, playerPosition }) => {
  return (
    <div className="maze">
      {maze.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} className={`cell ${cell}`}>
              {/* Render the end image */}
              {cell === 'end' && <img src={endImage} alt="End" className="icon" />}

              {/* Render the player avatar (start image) at the player's position */}
              {playerPosition.x === rowIndex && playerPosition.y === cellIndex && (
                <img src={startImage} alt="Player" className="icon" />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Maze;