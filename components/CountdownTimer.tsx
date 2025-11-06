import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft | null => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return (
        <div className="text-center p-4 mb-6 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">Platform Launched!</h2>
        </div>
    );
  }

  const timeParts = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="text-center p-4 mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
      <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Platform Launching In</h2>
      <div className="flex justify-center items-center space-x-4">
        {timeParts.map((part, index) => (
          <div key={part.label} className="flex items-center">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gray-800 dark:text-white tabular-nums">
                {String(part.value).padStart(2, '0')}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">{part.label}</span>
            </div>
            {index < timeParts.length - 1 && (
              <span className="text-3xl font-light text-gray-300 dark:text-gray-600 mx-2">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;