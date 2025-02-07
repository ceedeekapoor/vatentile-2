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
            new Audio(yippeeSound).play();
            setFeedback({
              message: "Correct. You have good taste and may live another day.",
              type: 'success'
            });
          
          break;

        case 'B':

            setPopup({ 
              show: true, 
              message: "You're a pedophile!", 
              type: 'error' 
            });
            setSelectedAnswer(null);
          break;

        case 'C':
            new Audio(honkSound).play();

          const img = document.createElement('img');
          img.src = '/mike-eye.jpg';
          img.className = 'cursed-eye';
          document.body.appendChild(img);
          setTimeout(() => {
            window.location.href = 'https://www.google.com/search?q=eye+surgery+near+me';
          }, 3000);
          break;

        case 'D':
            new Audio(snortSound).play();

          setShowApology(true);
          break;
      }
    } else if (questionNumber === 2) {
      switch(answer) {
        case 'A':
            new Audio(sighSound).play();

          setFeedback({
            message: "Too little, too late. Should've done that when you had the chance to. Try again 😠",
            type: 'error'
          });
          break;

        case 'B':
            new Audio(yippeeSound).play();

          setFeedback({
            message: "Correct. As you should.",
            type: 'success'
          });
          setShowRoses(true);

          break;

        case 'C':
          new Audio(clownSound).play();

          setTimeout(() => {

            setFeedback({
              message: "Hope ur proud of this answer 🤡",
              type: 'error'
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }, 4000);
          break;

          case 'D':
            new Audio(betrayalSound).play();
            setTimeout(() => {
              setPopup({
                show: true,
                message: "❌ CRITICAL ERROR: LOYALTY NOT FOUND ❌",
                type: 'error'
              });
            }, 2000);
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
          question: "If you had to compare me to a fictional character, who would I be?",
          options: [
            { id: 'A', text: "Raven from Teen Titans" },
            { id: 'B', text: "Vanellope from Wreck-It Ralph" },
            { id: 'C', text: "Mike Wazowski" },
            { id: 'D', text: "Peppa Pig" }
          ]
        };
      case 2:
        return {
          question: "If you could go back in time, what would you do differently?",
          options: [
            { id: 'A', text: "Give you the hinge rose LIKE I SHOULD HAVE" },
            { id: 'B', text: "Hand deliver rose to you personally on my knees" },
            { id: 'C', text: "Send khushi a rose, an apology text, AND a box of chocolates for the inconvenience" },
            { id: 'D', text: "Wouldn't change a thing" }
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
