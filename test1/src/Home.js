import React, { useState, useEffect } from 'react';
import './Stopwatch.css'; // Import the CSS file for styling

const Home = () => {
const [seconds, setSeconds] = useState(0);
const [isRunning, setIsRunning] = useState(false);

useEffect(() => {
    const interval = setInterval(() => {
        if (isRunning) {
            setSeconds(seconds => seconds + 1);
        }
    }, 1000);

    return () => clearInterval(interval);
}, [isRunning, seconds]);

const handleStart = () => {
    setIsRunning(true);
};

const handleStop = () => {
    setIsRunning(false);
};

const handleReset = () => {
    setSeconds(0);
};

const displayTime = () => {
    const formattedSeconds = seconds % 60;
    const minutes = Math.floor(seconds / 60);
    return `${minutes.toString().padStart(2, '0')}:${formattedSeconds.toString().padStart(2, '0')}`;
};

return (
    <div className="stopwatch-container">
        <div className="display">{displayTime()}</div>
        <div className="buttons">
            <button onClick={handleStart} disabled={isRunning}>Start</button>
            <button onClick={handleStop} disabled={!isRunning}>Stop</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    </div>
    );
};

export default Home;