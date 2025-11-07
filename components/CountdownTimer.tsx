import React, { useState, useEffect } from 'react';
import { ClockIcon } from './IconComponents';

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
        <div className="text-center p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-green-400">Platform Launched!</h2>
        </div>
    );
  }

  return (
    <div className="text-center p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
      <div className="flex items-center justify-center text-sm text-teal-400 mb-2">
        <ClockIcon className="w-5 h-5 mr-2" />
        <h2 className="font-semibold uppercase tracking-wider">Time until Election</h2>
      </div>
      <div className="flex justify-center items-end space-x-2 md:space-x-4">
          <div>
            <span className="text-4xl font-bold text-white tabular-nums">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="text-sm text-gray-400 ml-1">Days</span>
          </div>
           <div>
            <span className="text-4xl font-bold text-white tabular-nums">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-sm text-gray-400 ml-1">Hrs</span>
          </div>
           <div>
            <span className="text-4xl font-bold text-white tabular-nums">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-sm text-gray-400 ml-1">Mins</span>
          </div>
           <div>
            <span className="text-4xl font-bold text-white tabular-nums">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="text-sm text-gray-400 ml-1">Secs</span>
          </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
