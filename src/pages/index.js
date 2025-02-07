import React, { useState, useEffect } from 'react';
import Countdown from '../components/Countdown';
import MusicPlayer from '../components/Music';
import LoveCalculator from '../components/Calculator';
import GamesSection from '../components/GamesSection';
// import Slideshow from '../components/Slideshow';
import Question from '../components/Questions';
import { Helmet } from 'react-helmet';

const App = () => {
  const [isValentinesDay, setIsValentinesDay] = useState(false);

  useEffect(() => {
    const today = new Date();
    const valentinesDay = new Date(today.getFullYear(), 1, 9);
    if (today.getDate() === valentinesDay.getDate() && today.getMonth() === valentinesDay.getMonth()) {
      setIsValentinesDay(true);
    }
  }, []);

  return (
    <div className="App">
      <Helmet>
      <title>Valentine - Home</title>

      </Helmet>
      {isValentinesDay ? (
        <>
          <LoveCalculator />

        </>
      ) : (
        <>
             <MusicPlayer />

              <Countdown />

     <GamesSection />

           
          </>
      )}
    </div>
  );
};

export default App;
