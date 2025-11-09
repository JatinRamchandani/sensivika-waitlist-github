import React, { useState, useEffect, useRef } from 'react';

interface WaitlistCounterProps {
    count: number;
}

const WaitlistCounter: React.FC<WaitlistCounterProps> = ({ count }) => {
    const [displayCount, setDisplayCount] = useState(0);
    const prevCountRef = useRef(0);

    useEffect(() => {
        const start = prevCountRef.current;
        const end = count;
        if (start === end) return;

        const duration = 1000; // 1 second animation
        const frameRate = 60; // 60fps
        const totalFrames = Math.round(duration / (1000 / frameRate));
        const increment = (end - start) / totalFrames;
        
        let currentFrame = 0;
        const timer = setInterval(() => {
            currentFrame++;
            const newDisplayCount = Math.round(start + (increment * currentFrame));
            
            if (currentFrame >= totalFrames) {
                setDisplayCount(end);
                clearInterval(timer);
            } else {
                setDisplayCount(newDisplayCount);
            }
        }, 1000 / frameRate);
        
        // This assignment happens before the async interval starts, which is correct
        prevCountRef.current = end;

        return () => clearInterval(timer);
    }, [count]);

    // Set initial count without animation
    useEffect(() => {
        setDisplayCount(count);
        prevCountRef.current = count;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="text-center">
            <p className="text-lg md:text-xl text-cyan-300 font-mono tracking-wider">
                Pioneers on the waitlist
            </p>
            <div className="text-6xl md:text-8xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 my-2">
                {displayCount.toLocaleString()}
            </div>
        </div>
    );
};

export default WaitlistCounter;