import React, { useState, useEffect, useRef } from "react";
import "../styles/loveCalculator.css";
import Angry from "../images/angry.png";
import Love1 from "../images/slideshow-1.jpg";
import Love2 from "../images/slideshow-2.jpg";
import Love3 from "../images/slideshow-3.jpg";
import Love4 from "../images/slideshow-4.jpg";
import Love5 from "../images/slideshow-5.jpg";
import Love6 from "../images/slideshow-6.jpg";
import { navigate } from "gatsby";

const LoveCalculator = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  
  const name1Ref = useRef(null);
  const name2Ref = useRef(null);
  const submitButtonRef = useRef(null);

  const images = [Love1, Love2, Love3, Love4, Love5, Love6];

  useEffect(() => {
    const eyeL = document.querySelector(".eyeball-l");
    const eyeR = document.querySelector(".eyeball-r");
    const handL = document.querySelector(".hand-l");
    const handR = document.querySelector(".hand-r");

    const normalEyeStyle = () => {
      if (eyeL && eyeR) {
        eyeL.style.cssText = `left:0.6em; top: 0.6em;`;
        eyeR.style.cssText = `right:0.6em; top:0.6em;`;
      }
    };

    const normalHandStyle = () => {
      if (handL && handR) {
        handL.style.cssText = `height: 2.81em; top:8.4em; left:7.5em; transform: rotate(0deg);`;
        handR.style.cssText = `height: 2.81em; top: 8.4em; right: 7.5em; transform: rotate(0deg)`;
      }
    };

    const handleNameFocus = () => {
      if (eyeL && eyeR) {
        eyeL.style.cssText = `left: 0.75em; top: 1.12em;`;
        eyeR.style.cssText = `right: 0.75em; top: 1.12em;`;
      }
      normalHandStyle();
    };

    const handleSubmitClick = () => {
      if (handL && handR) {
        handL.style.cssText = `height: 6.56em; top: 3.87em; left: 11.75em; transform: rotate(-155deg);`;
        handR.style.cssText = `height: 6.56em; top: 3.87em; right: 11.75em; transform: rotate(155deg);`;
      }
      normalEyeStyle();
    };

    const handleOutsideClick = (e) => {
      if (e.target !== name1Ref.current && 
          e.target !== name2Ref.current && 
          e.target !== submitButtonRef.current) {
        normalEyeStyle();
        normalHandStyle();
      }
    };

    name1Ref.current?.addEventListener("focus", handleNameFocus);
    name2Ref.current?.addEventListener("focus", handleNameFocus);
    submitButtonRef.current?.addEventListener("click", handleSubmitClick);
    document.addEventListener("click", handleOutsideClick);

    let progressTimer;
    let slideTimer;

    if (isLoading) {
      progressTimer = setInterval(() => {
        setProgress(prev => prev >= 100 ? 100 : prev + 1);
      }, 100);

      slideTimer = setInterval(() => {
        setCurrentImage(prev => (prev + 1) % images.length);
      }, 1000);
    }

    return () => {
      name1Ref.current?.removeEventListener("focus", handleNameFocus);
      name2Ref.current?.removeEventListener("focus", handleNameFocus);
      submitButtonRef.current?.removeEventListener("click", handleSubmitClick);
      document.removeEventListener("click", handleOutsideClick);
      clearInterval(progressTimer);
      clearInterval(slideTimer);
    };
  }, [isLoading, images.length]);

  const calculateLove = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);

    setTimeout(() => {
      setIsLoading(false);
      if( (name1.toLowerCase() === "siddhi" && name2.toLowerCase() === "saad") ||
      (name1.toLowerCase() === "saad" && name2.toLowerCase() === "siddhi") ) 
        {
        setResult("1000000000 % match");
      } else {
        setResult("image");
      }
    }, 10000);
  };

  return (
    <div className="love-calculator">
  <h1 style={{
    position: "absolute",
    top: '0',
    left: '33%',

  }}>Calculate love %</h1>
      <div className="container">
        <form onSubmit={calculateLove} className="calculator-form">
          <input 
            ref={name1Ref}
            type="text"
            placeholder="Enter First Name"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            disabled={isLoading}
            required
          />
          <input
            ref={name2Ref}
            type="text"
            placeholder="Enter Second Name"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            disabled={isLoading}
            required
          />
          <button
            ref={submitButtonRef}
            type="submit"
            disabled={isLoading || !name1 || !name2}
            className={isLoading ? "button-disabled" : ""}
          >
            <span>{isLoading ? "Calculating..." : "Calculate Love"}</span>
          </button>
        </form>

        {/* Panda Face Structure */}
        <div className="ear-l" />
        <div className="ear-r" />
        <div className="panda-face">
          <div className="blush-l" />
          <div className="blush-r" />
          <div className="eye-l">
            <div className="eyeball-l" />
          </div>
          <div className="eye-r">
            <div className="eyeball-r" />
          </div>
          <div className="nose" />
          <div className="mouth" />
        </div>
        <div className="hand-l" />
        <div className="hand-r" />
        <div className="paw-l" />
        <div className="paw-r" />
      </div>

      {/* Loading and Results Section */}
      {isLoading && (
        <div className="loading-section">

          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="progress-text">
              Calculating Love Compatibility: {progress}%
            </div>
          </div>
          <div className="slideshow-container">
            <img
              src={images[currentImage]}
              alt="Love"
              className="slideshow-image"
            />
          </div>
        </div>
      )}

      {!isLoading && result && (
        <div className="result-container">
          {result === "image" ? (
            <div className="failed-match">
              <img src={Angry} alt="Not Compatible" className="result-image" />
              <p
              className="result-message"
              >WOW whose name r u searching WHORE</p>
            </div>
          ) : (
            <div className="success-match">
              <h2 className="result-text">{result}</h2>
              <p className="text" >THATS INSANE YALL SHOULD MARRY</p>
              <button
                className="proceed-button"
                onClick={() => navigate("/questions")}
              >
                Proceed Further
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoveCalculator;
