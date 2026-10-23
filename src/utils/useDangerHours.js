import { useState, useEffect } from 'react';

export function useDangerHours() {
  const [isDangerTime, setIsDangerTime] = useState(false);
  const [currentHourText, setCurrentHourText] = useState('');

  useEffect(() => {
    const checkDangerHours = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // Format HH:MM
      setCurrentHourText(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      );

      // Rentang waktu rawan: Pukul 22.00 malam s.d. 04.30 subuh
      const isNightTime = hours >= 22 || hours < 4 || (hours === 4 && minutes <= 30);
      setIsDangerTime(isNightTime);
    };

    checkDangerHours();
    const interval = setInterval(checkDangerHours, 30000); // Cek tiap 30 detik

    return () => clearInterval(interval);
  }, []);

  return { isDangerTime, currentHourText };
}
