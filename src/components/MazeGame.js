import React, { useState, useEffect } from 'react';
import Maze from './Maze';
import startIcon from '../images/start.png'; // Custom start image
import endIcon from '../images/end.png'; // Custom end image

// Maze generation algorithm
function newMaze(x, y) {
  var totalCells = x * y;
  var cells = new Array();
  var unvis = new Array();
  for (var i = 0; i < y; i++) {
    cells[i] = new Array();
    unvis[i] = new Array();
    for (var j = 0; j < x; j++) {
      cells[i][j] = [0, 0, 0, 0]; // [top, right, bottom, left]
      unvis[i][j] = true;
    }
  }

  var currentCell = [Math.floor(Math.random() * y), Math.floor(Math.random() * x)];
  var path = [currentCell];
  unvis[currentCell[0]][currentCell[1]] = false;
  var visited = 1;

  while (visited < totalCells) {
    var pot = [
      [currentCell[0] - 1, currentCell[1], 0, 2],
      [currentCell[0], currentCell[1] + 1, 1, 3],
      [currentCell[0] + 1, currentCell[1], 2, 0],
      [currentCell[0], currentCell[1] - 1, 3, 1],
    ];
    var neighbors = new Array();

    for (var l = 0; l < 4; l++) {
      if (
        pot[l][0] > -1 &&
        pot[l][0] < y &&
        pot[l][1] > -1 &&
        pot[l][1] < x &&
        unvis[pot[l][0]][pot[l][1]]
      ) {
        neighbors.push(pot[l]);
      }
    }

    if (neighbors.length) {
      var next = neighbors[Math.floor(Math.random() * neighbors.length)];
      cells[currentCell[0]][currentCell[1]][next[2]] = 1;
      cells[next[0]][next[1]][next[3]] = 1;
      unvis[next[0]][next[1]] = false;
      visited++;
      currentCell = [next[0], next[1]];
      path.push(currentCell);
    } else {
      currentCell = path.pop();
    }
  }
  return cells;
}

// Convert maze to grid for rendering
function convertMazeToGrid(maze) {
  const rows = maze.length;
  const cols = maze[0].length;
  const grid = new Array(rows * 2 + 1).fill().map(() => new Array(cols * 2 + 1).fill('wall'));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = maze[i][j];
      const x = i * 2 + 1;
      const y = j * 2 + 1;

      grid[x][y] = 'path'; // Center of the cell is always a path

      if (cell[0] === 1) grid[x - 1][y] = 'path'; // Top
      if (cell[1] === 1) grid[x][y + 1] = 'path'; // Right
      if (cell[2] === 1) grid[x + 1][y] = 'path'; // Bottom
      if (cell[3] === 1) grid[x][y - 1] = 'path'; // Left
    }
  }

  // Set start and end points
  grid[1][1] = 'start'; // Top-left corner
  grid[grid.length - 2][grid[0].length - 2] = 'end'; // Bottom-right corner

  return grid;
}

const App = () => {
  const [maze, setMaze] = useState([]);
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 }); // Player starts at the start point
  const [gameStatus, setGameStatus] = useState('Maze Game');

  useEffect(() => {
    const generatedMaze = newMaze(10, 10); // Generate a 10x10 maze
    const grid = convertMazeToGrid(generatedMaze);
    setMaze(grid);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }
      const { x, y } = playerPosition;
      switch (e.key) {
        case 'ArrowUp':
          if (maze[x - 1] && (maze[x - 1][y] === 'path' || maze[x - 1][y] === 'start' || maze[x - 1][y] === 'end')) {
            setPlayerPosition({ x: x - 1, y });
            if (maze[x - 1][y] === 'end') {
              setGameStatus('YEY YOU WIN !!!');
            }
          }
          break;
        case 'ArrowDown':
          if (maze[x + 1] && (maze[x + 1][y] === 'path' || maze[x + 1][y] === 'start' || maze[x + 1][y] === 'end')) {
            setPlayerPosition({ x: x + 1, y });
            if (maze[x + 1][y] === 'end') {
              setGameStatus('YEY YOU WIN !!!');
            }
          }
          break;
        case 'ArrowLeft':
          if (maze[x][y - 1] === 'path' || maze[x][y - 1] === 'start' || maze[x][y - 1] === 'end') {
            setPlayerPosition({ x, y: y - 1 });
            if (maze[x][y - 1] === 'end') {
              setGameStatus('YEY YOU WIN !!!');
            }
          }
          break;
        case 'ArrowRight':
          if (maze[x][y + 1] === 'path' || maze[x][y + 1] === 'start' || maze[x][y + 1] === 'end') {
            setPlayerPosition({ x, y: y + 1 });
            if (maze[x][y + 1] === 'end') {
              setGameStatus('YEY YOU WIN !!!');
            }
          }
          break;
        default:
          break;
      }
    };
    

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPosition, maze]);



  return (
    <div className="App">
      <h1>{gameStatus}</h1>
      {maze.length > 0 && (
        <Maze
          maze={maze}
          startImage={startIcon}
          endImage={endIcon}
          playerPosition={playerPosition}
        />
      )}
    </div>
  );
};

export default App;