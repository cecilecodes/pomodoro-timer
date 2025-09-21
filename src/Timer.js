import React, { useState, useEffect } from 'react';

const Timer = () => {
  const POMODORO_TIME = 25 * 60; // 25 minutes
  const SHORT_BREAK = 5 * 60;    // 5 minutes
  const LONG_BREAK = 15 * 60;   // 15 minutes

  const [time, setTime] = useState(POMODORO_TIME);
  const [isActive, setIsActive] = useState(false);
  const [session, setSession] = useState('Pomodoro');
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      handleSessionEnd();
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleSessionEnd = () => {
    if (session === 'Pomodoro') {
      setPomodorosCompleted((prev) => prev + 1);
      if (pomodorosCompleted % 4 === 3) {
        setSession('Long Break');
        setTime(LONG_BREAK);
        alert("Time for a long break!");
      } else {
        setSession('Short Break');
        setTime(SHORT_BREAK);
        alert("Time for a short break!");
      }
    } else {
      setSession('Pomodoro');
      setTime(POMODORO_TIME);
      alert("Break is over! Time to focus.");
    }
    setIsActive(false);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(POMODORO_TIME);
    setSession('Pomodoro');
    setPomodorosCompleted(0);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="timer-container">
      <h2>{session}</h2>
      <div className="timer-display">
        {formatTime(time)}
      </div>
      <div className="timer-controls">
        <button onClick={toggleTimer} className="timer-button">
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer} className="timer-button">
          Reset
        </button>
      </div>
      <p>Pomodoros completed: {pomodorosCompleted}</p>
    </div>
  );
};

export default Timer;