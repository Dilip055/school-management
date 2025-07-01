import React, { useState, useEffect } from 'react';
const AnimatedCounter = ({ count, duration = 2000 }) => {
  const [currentCount, setCurrentCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = count;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCurrentCount(start);
      if (start === end) {
        clearInterval(timer);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [count, duration]);
  return <span>{currentCount.toLocaleString()}</span>;
};
export default AnimatedCounter;