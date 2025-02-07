import React, { useState, useEffect } from 'react';
import '../styles/countdown.css';
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const valentinesDay = new Date('February 9, 2025 00:00:00');
      const now = new Date();
      const diff = valentinesDay - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft('Happy Valentine\'s Day!');
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown">
      <h1>Countdown for surprise</h1>
      <p>{timeLeft}</p>





      
    </div>
  );
};

export default Countdown;
