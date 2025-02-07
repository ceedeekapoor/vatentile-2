import React, { useState, useEffect } from "react";
import "../styles/puzzleGame.css";
import Image from "../images/puzzle-image.jpg";

const PuzzleGame = ({ rows = 3, cols = 3 }) => {
  const [pieces, setPieces] = useState([]);
  const [completed, setCompleted] = useState(false);
  const puzzleImage = "/images/puzzle-image.jpg";

  useEffect(() => {
    const generatePieces = () => {
      const newPieces = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          newPieces.push({
            id: `${row}-${col}`,
            correctRow: row, // Fixed correct position
            correctCol: col, // Fixed correct position
            currentRow: row,
            currentCol: col,
          });
        }
      }
      // Shuffle pieces (only currentRow and currentCol)
      for (let i = newPieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newPieces[i].currentRow, newPieces[j].currentRow] = [
          newPieces[j].currentRow,
          newPieces[i].currentRow,
        ];
        [newPieces[i].currentCol, newPieces[j].currentCol] = [
          newPieces[j].currentCol,
          newPieces[i].currentCol,
        ];
      }
      setPieces(newPieces);
    };
    generatePieces();
  }, [rows, cols]);
  

  const handleDragStart = (e, piece) => {
    e.dataTransfer.setData("pieceId", piece.id);
  };

// Inside PuzzleGame component
const handleDrop = (e, targetPiece) => {
  e.preventDefault();
  const draggedId = e.dataTransfer.getData("pieceId");
  const draggedPiece = pieces.find((p) => p.id === draggedId);

  const updatedPieces = pieces.map((p) => {
    if (p.id === draggedId) {
      return { 
        ...p, 
        currentRow: targetPiece.currentRow, 
        currentCol: targetPiece.currentCol 
      };
    }
    if (p.id === targetPiece.id) {
      return { 
        ...p, 
        currentRow: draggedPiece.currentRow, 
        currentCol: draggedPiece.currentCol 
      };
    }
    return p;
  });

  setPieces(updatedPieces);
  checkCompletion(updatedPieces);
};


const checkCompletion = (currentPieces) => {
  const isComplete = currentPieces.every(
    (p) => p.correctRow === p.currentRow && p.correctCol === p.currentCol
  );

  if (isComplete && !completed) {
    setCompleted(true);
    // Add a delay before showing the alert
  } else if (!isComplete && completed) {
    setCompleted(false);
  }
};


  const handleDragOver = (e) => {
    e.preventDefault(); // This is crucial for enabling drop
  };
  
  return (
    <div className="puzzle-container">
      <h1>{completed ? "🎉 Puzzle Completed! 🎉" : "Solve the Puzzle!"}</h1>
      <div
        className="puzzle-grid"
        style={{
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}
      >
        {pieces.map((piece) => (
          <div
  key={piece.id}
  className="puzzle-piece"
  draggable={true}
  onDragStart={(e) => handleDragStart(e, piece)}
  onDragOver={handleDragOver}
  onDrop={(e) => handleDrop(e, piece)}
  style={{
    backgroundImage: `url(${Image})`,
    backgroundSize: `${cols * 100}% ${rows * 100}%`,
    backgroundPosition: `${(piece.currentCol * 100) / (cols - 1)}% ${
      (piece.currentRow * 100) / (rows - 1)
    }%`,
  }}
/>

        ))}
      </div>
    </div>
  );
};

export default PuzzleGame;