import React, {useEffect, useState,useRef } from "react";
import Draggable from "react-draggable";
import "../styles/popup.css";
import Confetti from "react-confetti";
import MailboxClosed from "../images/mailbox.png";
import MailboxOpen from "../images/open-mailbox.png";
// import Scissors from "../images/scissor.png"; 
// import ClosedLetter from "../images/letter.png";
// import OpenLetter from "../images/opened-letter.png";
// import DraggableLetter from "../images/drag-letter.png";
import Riddle from "../images/riddle.png";
import { navigate } from "gatsby";
const Popup = () => {
  const [mailboxState, setMailboxState] = useState("closed");
  const [draggedOut, setDraggedOut] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const letterRef = useRef(null);
  const [dragStart, setDragStart] = useState(null);
  const [scissorPosition, setScissorPosition] = useState({ x: 0, y: 0 });
  const [showCelebration, setShowCelebration] = useState(false);
  const [showSecondLetter, setShowSecondLetter] = useState(false);
  const [isSecondLetterOpen, setIsSecondLetterOpen] = useState(false);
  const [secondLetterDragStart, setSecondLetterDragStart] = useState(null);
  const secondLetterRef = useRef(null);
  const [secondScissorPosition, setSecondScissorPosition] = useState({ x: 0, y: 0 });
  const [showTransition, setShowTransition] = useState(false);


  const handleYesClick = () => {
    setShowCelebration(true);
  };

  useEffect(() => {
    if (showCelebration) {
      const timer = setTimeout(() => {
        setShowCelebration(false);
        setShowTransition(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showCelebration]);
  
  
  const handleNoHover = (e) => {
    const button = e.target;
    // Reduced range of movement
    const moveRange = 500; // pixels
    
    const randomX = (Math.random() - 0.5) * moveRange;
    const randomY = (Math.random() - 0.5) * moveRange;
    
    button.style.transition = 'all 0.3s ease';
    button.style.transform = `translate(${randomX}px, ${randomY}px)`;
  };
  
  
  const handleOpenMailbox = () => {
    setMailboxState("open");
  };


  const handleScissorDrag = (e, data) => {
    setScissorPosition({ x: data.x, y: data.y });

    if (letterRef.current) {
      const letterBounds = letterRef.current.getBoundingClientRect();
      const scissorsPosition = {
        x: e.clientX,
        y: e.clientY
      };
      
      // Start tracking when scissors touch left side of letter
      if (!dragStart && 
          scissorsPosition.x >= letterBounds.left && 
          scissorsPosition.x <= letterBounds.left + 50 &&
          scissorsPosition.y >= letterBounds.top &&
          scissorsPosition.y <= letterBounds.bottom) {
        setDragStart(scissorsPosition.x);
      }
      
      // Open letter when scissors drag across to right side
      if (dragStart && 
          scissorsPosition.x >= letterBounds.right - 50 &&
          scissorsPosition.y >= letterBounds.top &&
          scissorsPosition.y <= letterBounds.bottom) {
        setIsLetterOpen(true);
        setDragStart(null);
      }
    }
  };
  
  const handleSecondScissorDrag = (e, data) => {
  setSecondScissorPosition({ x: data.x, y: data.y });

  if (secondLetterRef.current) {
    const letterBounds = secondLetterRef.current.getBoundingClientRect();
    const scissorsPosition = {
      x: e.clientX,
      y: e.clientY
    };
    
    if (!secondLetterDragStart && 
        scissorsPosition.x >= letterBounds.left && 
        scissorsPosition.x <= letterBounds.left + 50 &&
        scissorsPosition.y >= letterBounds.top &&
        scissorsPosition.y <= letterBounds.bottom) {
      setSecondLetterDragStart(scissorsPosition.x);
    }
    
    if (secondLetterDragStart && 
        scissorsPosition.x >= letterBounds.right - 50 &&
        scissorsPosition.y >= letterBounds.top &&
        scissorsPosition.y <= letterBounds.bottom) {
      setIsSecondLetterOpen(true);
      setSecondLetterDragStart(null);
    }
  }
};


  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
    const distance = Math.sqrt(data.x * data.x + data.y * data.y);

    if (distance > 200) {
      setDraggedOut(true);
      setMailboxState("hidden");
      setTimeout(() => setShowMessage(true), 500);
    }
  };

  const handleStart = () => {
    // Add a subtle animation class when dragging starts
    document.querySelector('.draggable-letter').classList.add('dragging');
  };

  const handleStop = () => {
    document.querySelector('.draggable-letter').classList.remove('dragging');
    
    // Reset position if not dragged far enough
    if (!draggedOut) {
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <div className="popup-container">
      {showCelebration && (
  <>
    <Confetti 
      numberOfPieces={2000}
      recycle={true}
      colors={['#ff4d6d', '#ff85a1', '#ffc2d1', '#ffb3c1']}
    />
    <div className="celebration-message">
      <h1 className="yey-txt">Yay! ILYSM</h1>
    </div>
  </>
)}
      {!draggedOut && <h1>You've Got Love Mail! 💌</h1>}

      {mailboxState === "closed" && (
        <div className="mailbox-container">
          <img src={MailboxClosed} width={400} alt="Closed Mailbox" />
          <button className="open-button" onClick={handleOpenMailbox}>
            Open
          </button>
        </div>
      )}

      {mailboxState === "open" && !draggedOut && (
        <div className="mailbox-container">
          <img src={MailboxOpen} width={400} alt="Open Mailbox" />
          <Draggable
            position={position}
            onDrag={handleDrag}
            onStart={handleStart}
            onStop={handleStop}
            bounds="parent"
            grid={[1, 1]}
          >
            <img 
              src='/drag-letter.png'
              width={100} 
              alt="Letter Inside" 
              className="draggable-letter"
            />
          </Draggable>
        </div>
      )}

{draggedOut && !showTransition && (
  <div className="letter-container ">
    <img 
      ref={letterRef}
      src={isLetterOpen ? '/opened-letter.png' : '/letter.png'} 
      width={300} 
      alt="Letter" 
      className="closed-letter"
    />
     
    <Draggable
  onDrag={handleScissorDrag}
  onStart={(e) => e.target.classList.add('dragging')}
  onStop={(e) => e.target.classList.remove('dragging')}
>
  <img 
    src='/scissor.png'
    width={50} 
    alt="Scissors" 
    className="scissors"
  />
</Draggable>

{isLetterOpen && (
      <div >
<button className="yes-button" onClick={handleYesClick}>YESS 💕</button>
<button className="no-button" onMouseEnter={handleNoHover}>No 😢</button>
        </div>
    )}
  </div>
)}
{!showCelebration && showTransition && (
  <div className="valentine-message fade-in">
    <h2>Wait, there's something else too...</h2>
    <button className="open-button" onClick={() => setShowSecondLetter(true)}>
      Continue
    </button>
  </div>
)}





{showSecondLetter && (
  <div className="mailbox-container">
    <h2>OH IT'S ANOTHER LETTER!</h2>
    <div>
      <img 
        ref={secondLetterRef}
        src={isSecondLetterOpen ? Riddle : '/letter.png'} 
        alt="Second Letter" 
        className="riddle-image"
      />
      <Draggable
        onDrag={handleSecondScissorDrag}
        onStart={(e) => e.target.classList.add('dragging')}
        onStop={(e) => e.target.classList.remove('dragging')}
      >
        <img 
          src='/scissor.png'
          width={50} 
          alt="Scissors" 
          className="scissors"
        />
      </Draggable>
    </div>
  </div>
)}
{isSecondLetterOpen && (
  <>
    <h3 className="riddle-prompt">Solve this riddle to find your next surprise! 💝</h3>
    <button 
      className="next-button"
      onClick={() => navigate('/end')}
      style={{
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#ff4081',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      Finish
    </button>
  </>
)}


    </div>
  );

};

export default Popup;
