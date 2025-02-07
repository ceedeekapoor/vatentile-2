import React, { useState } from 'react';
import '../styles/questions.css';
import yippeeSound from '../../static/audio/yippee.mp3';
import betrayalSound from '../../static/audio/betrayal.mp3';
import clownSound from '../../static/audio/clown.mp3';
import sighSound from '../../static/audio/sigh.mp3';
import honkSound from '../../static/audio/honk.mp3';
import snortSound from '../../static/audio/snort.mp3';
import { navigate } from 'gatsby';
const Questions = () => {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showApology, setShowApology] = useState(false);
  const [apologyText, setApologyText] = useState('');
  const [showRoses, setShowRoses] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [popup, setPopup] = useState({ show: false, message: '', type: '' });

  const handleNextQuestion = () => {
    setQuestionNumber(prev => prev + 1);
    setSelectedAnswer(null);
    setShowApology(false);
    setShowRoses(false);
    setFeedback(null);
  };

  const handleAnswer = (answer) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    if (questionNumber === 1) {
      switch(answer) {
        case 'A':
          setFeedback({
            message: "hmmm thats not realistic at all 🤔",
            type: 'error'
          });
          break;

        case 'B':
          new Audio(yippeeSound).play();
          setFeedback({
            message: "Correct! Let's continue...",
            type: 'success'
          });
          break;

          case 'C':
            setFeedback({
              message: "i alrdy brought my food with me",
              type: 'error'
            });
            setTimeout(() => {
              const img = document.createElement('img');
              img.src = '/food-image.jpg';
              img.className = 'food-image zoom-effect';
              document.body.appendChild(img);
            }, 1500);
            break;
          

        case 'D':
          new Audio(sighSound).play();
          setPopup({ 
            show: true, 
            message: "🤣🤣🤣🤣🤣🤣", 
            type: 'error' 
          });
          break;
      }
    } else if (questionNumber === 2) {
      switch(answer) {
        case 'A':
          new Audio(clownSound).play();
          setFeedback({
            message: "CHANGE MY NAME ON YO PHONE RN",
            type: 'error'
          });
          setTimeout(() => {
            window.location.reload();
          }, 5000);
          break;

        case 'B':
          setPopup({ 
            show: true, 
            message: "tsk tsk pp always on yo mind", 
            type: 'error' 
          });
          break;

        case 'C':
          new Audio(yippeeSound).play();
          setFeedback({
            message: "Perfect answer! ✨",
            type: 'success'
          });
          break;

        case 'D':
          new Audio(betrayalSound).play();
          setFeedback({
            message: "wow just say you hate me",
            type: 'error'
          });
          break;
      }
    }
  };


  const handleApology = (e) => {
    e.preventDefault();
    if (apologyText.toLowerCase().includes('sorry')) {
      setShowApology(false);
      setSelectedAnswer(null);
    }
  };

  const renderQuestion = () => {
    switch(questionNumber) {
      case 1:
        return {
          question: "If we were stuck on a desert island, what would the be the first thing I do?",
          options: [
            { id: 'A', text: "Build a sand castle for us to live in" },
            { id: 'B', text: "Write sahil ❤️ nishi on sand" },
            { id: 'C', text: "Find food" },
            { id: 'D', text: "Build a wifi Tower out of coconuts" }
          ]
        };
      case 2:
        return {
          question: "If you were to change my name, what would it be?",
          options: [
            { id: 'A', text: "The Deep" },
            { id: 'B', text: "Big banana" },
            { id: 'C', text: "I wont change it. I love the name Sahil." },
            { id: 'D', text: "Something with bihari in it" }
          ]
        };
    }
  };

  const RoseAnimation = () => {
    return (
      <div className="roses-container">
        {[...Array(300)].map((_, i) => (
          <div key={i} className="rose" style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 2 + 3}s`,
            animationDelay: `${Math.random() * 2}s`
          }}>
            🌹
          </div>
        ))}
      </div>
    );
  };

  const currentQuestion = renderQuestion();

  return (
    <div className="questions-container">
      <h1 className="title">Now let's see how well you know me... 👀</h1>

      <div className="question-card">
        <h2>Question {questionNumber}:</h2>
        <p>{currentQuestion.question}</p>

        <div className="options-container">
        {currentQuestion.options.map((option) => (
  <button
    key={option.id}
    className={`option ${selectedAnswer === option.id ? 'selected' : ''}`}
    onClick={() => handleAnswer(option.id)}
    disabled={selectedAnswer && selectedAnswer !== option.id}
  >
    {option.id}. {option.text}
  </button>
))}

        </div>

      {feedback && (
  <div className={`feedback ${feedback.type}`}>
    <p>{feedback.message}</p>
    {feedback.type === 'success' && questionNumber === 2 ? (
      <button 
        className="next-button"
        onClick={() => navigate('/mail')}
      >
        Proceed
      </button>
    ) : feedback.type === 'success' && (
      <button 
        className="next-button"
        onClick={handleNextQuestion}
      >
        Next Question ➡️
      </button>
    )}
  </div>
)}

        {popup.show && (
  <div className="popup-overlay" onClick={() => setPopup({ show: false, message: '', type: '' })}>
    <div className="popup-content" onClick={e => e.stopPropagation()}>
      <p>{popup.message}</p>
      <button 
        onClick={() => setPopup({ show: false, message: '', type: '' })}
        style={{ padding: '8px 16px', marginTop: '10px' }}
      >
        sorry ૮(˶ㅠ︿ㅠ)ა
      </button>
    </div>
  </div>
)}

        {showApology && (
          <div className="apology-form">
            <p>"Your relationship is in shambles. Hope you got what you wanted" 🐷</p>
            <form onSubmit={handleApology}>
              <input
                type="text"
                placeholder="Type 'sorry' to try again..."
                value={apologyText}
                onChange={(e) => setApologyText(e.target.value)}
              />
              <button className='pig-button' type="submit">Apologize</button>
            </form>
          </div>
        )}

        {showRoses && <RoseAnimation />}
      </div>
    </div>
  );
};

export default Questions;
