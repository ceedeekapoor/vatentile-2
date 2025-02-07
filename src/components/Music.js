import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import "../styles/musicPlayer.css"; // Add your CSS styles

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audio, setAudio] = useState(null);

  const albums = [
    "Chet Baker",
    "Dayglow",
    "Cigarettes After Sex",
    "Matthew Ifield",
    "Rex Orange County",
    "The Cardigans",
  ];

  const trackNames = [
    "Like Someone In Love",
    "Close to You",
    "K.",
    "Like I Do",
    "THE SHADE",
    "Lovefool",
  ];

  const albumArtworks = [
    "/images/1.jpg",
    "/images/2.webp",
    "/images/3.png",
    "/images/4.jpeg",
    "/images/5.jpg",
    "/images/6.jpeg",
  ];

  const trackUrl = [
    "/audio/1.mp3",
    "/audio/2.mp3",
    "/audio/3.mp3",
    "/audio/4.mp3",
    "/audio/5.mp3",
    "/audio/6.mp3",
  ];

  // Initialize Audio only in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (audio) {
        audio.pause(); // Stop the previous audio before switching tracks
      }

      // Create new audio instance
      const newAudio = new Audio(trackUrl[currentTrackIndex]);
      setAudio(newAudio);

      // Auto-play the new track if it was already playing
      if (isPlaying) {
        newAudio.play();
      }
    }
  }, [currentTrackIndex]); // Run when track index changes

  // Handle Audio Events
  useEffect(() => {
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleTrackEnd = () => {
      setIsPlaying(false);
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % trackUrl.length);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleTrackEnd);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleTrackEnd);
    };
  }, [audio]);

  // Play / Pause Function
  const playPause = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Previous Track
  const playPrevious = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? trackUrl.length - 1 : prevIndex - 1
    );
  };

  // Next Track
  const playNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % trackUrl.length);
  };

  // Format Time (mm:ss)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  // Seek Bar Click
  const handleSeekBarClick = (e) => {
    if (!audio || !duration) return;
    const seekBar = e.currentTarget;
    const rect = seekBar.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const newTime = position * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Seek Bar Width
  const seekBarWidth = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div id="player-container">
      <div id="player-bg-artwork"></div>
      <div id="player-bg-layer"></div>
      <div id="player">
        <div id="player-track" className={isPlaying ? "active" : ""}>
          <div id="album-name">{albums[currentTrackIndex]}</div>
          <div id="track-name">{trackNames[currentTrackIndex]}</div>
          <div id="track-time" className={isPlaying ? "active" : ""}>
            <div id="current-time">{formatTime(currentTime)}</div>
            <div id="track-length">{formatTime(duration)}</div>
          </div>
          <div id="seek-bar-container" onClick={handleSeekBarClick}>
            <div id="seek-bar" style={{ width: `${seekBarWidth}%` }}></div>
          </div>
        </div>
        <div id="player-content">
          <div id="album-art" className={`${isPlaying ? "active" : ""}`}>
            <img
              src={`${albumArtworks[currentTrackIndex]}`}
              className="active"
              alt="Album Art"
            />
          </div>
          <div id="player-controls">
            <div className="control">
              <div className="button" onClick={playPrevious}>
                <FontAwesomeIcon className="action-button" icon={faBackward} />
              </div>
            </div>
            <div className="control">
              <div className="button" onClick={playPause}>
                <FontAwesomeIcon className="action-button" icon={isPlaying ? faPause : faPlay} />
              </div>
            </div>
            <div className="control">
              <div className="button" onClick={playNext}>
                <FontAwesomeIcon className="action-button" icon={faForward} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
