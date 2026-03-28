import { useState, useEffect } from 'react';

export function WeddingTimer() {
  const weddingDate = new Date('2026-08-08T09:00:00').getTime();
  
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = weddingDate - now;
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
      <div className="flex gap-1 md:gap-4 justify-center flex-wrap items-center">

        {/* Дни */}
        <div className="flex flex-col items-center bg-white/50 backdrop-blur-sm rounded-lg p-2 md:p-4 min-w-[60px] md:min-w-[80px] shadow-md">
    <span className="text-2xl md:text-4xl font-bold" style={{ color: 'var(--wedding-dark)' }}>
      {String(timeLeft.days).padStart(2, '0')}
    </span>
          <span className="text-xs md:text-sm" style={{ color: 'var(--wedding-text)' }}>дней</span>
        </div>

        <span className="text-xl md:text-3xl " style={{ color: 'var(--wedding-dark)' }}>:</span>

        {/* Часы */}
        <div className="flex flex-col items-center bg-white/50 backdrop-blur-sm rounded-lg p-2 md:p-4 min-w-[60px] md:min-w-[80px] shadow-md">
    <span className="text-2xl md:text-4xl font-bold" style={{ color: 'var(--wedding-dark)' }}>
      {String(timeLeft.hours).padStart(2, '0')}
    </span>
          <span className="text-xs md:text-sm" style={{ color: 'var(--wedding-text)' }}>часов</span>
        </div>

        <span className="text-xl md:text-3xl " style={{ color: 'var(--wedding-dark)' }}>:</span>

        {/* Минуты */}
        <div className="flex flex-col items-center bg-white/50 backdrop-blur-sm rounded-lg p-2 md:p-4 min-w-[60px] md:min-w-[80px] shadow-md">
    <span className="text-2xl md:text-4xl font-bold" style={{ color: 'var(--wedding-dark)' }}>
      {String(timeLeft.minutes).padStart(2, '0')}
    </span>
          <span className="text-xs md:text-sm" style={{ color: 'var(--wedding-text)' }}>минут</span>
        </div>

        <span className="text-xl md:text-3xl " style={{ color: 'var(--wedding-dark)' }}>:</span>

        {/* Секунды */}
        <div className="flex flex-col items-center bg-white/50 backdrop-blur-sm rounded-lg p-2 md:p-4 min-w-[60px] md:min-w-[80px] shadow-md">
    <span className="text-2xl md:text-4xl font-bold" style={{ color: 'var(--wedding-dark)' }}>
      {String(timeLeft.seconds).padStart(2, '0')}
    </span>
          <span className="text-xs md:text-sm" style={{ color: 'var(--wedding-text)' }}>секунд</span>
        </div>

      </div>
  );
}
