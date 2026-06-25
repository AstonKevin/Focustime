import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer(focusDuration) {
  const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [completionCount, setCompletionCount] = useState(0);
  const intervalRef = useRef(null);

  // 当专注时长改变时重置计时器
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(focusDuration * 60);
    }
  }, [focusDuration]);

  // 计时逻辑
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // 计时完成
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setIsPaused(false);
            setCompletionCount(c => c + 1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);

  const start = useCallback(() => {
    if (timeLeft <= 0) {
      setTimeLeft(focusDuration * 60);
    }
    setIsRunning(true);
    setIsPaused(false);
  }, [timeLeft, focusDuration]);

  const pause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(focusDuration * 60);
  }, [focusDuration]);

  return {
    timeLeft,
    isRunning,
    isPaused,
    start,
    pause,
    reset,
    completionCount
  };
}
