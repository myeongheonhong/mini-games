import { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';

interface TimerProps {
  isGameStart: boolean;
}

const Timer = memo(({ isGameStart }: TimerProps) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!isGameStart) return; // 게임이 종료되어도 타이머는 계속 유지

    const interval = setInterval(() => {
      setTimer((prev) => prev + 10);
    }, 10);
    return () => clearInterval(interval);
  }, [isGameStart]);

  const seconds = Math.floor(timer / 1000);
  const milliseconds = Math.floor((timer % 1000) / 10);
  const formattedTime = `${seconds.toString().padStart(2, '0')}:${milliseconds
    .toString()
    .padStart(2, '0')}`;

  return (
    <motion.div
      className="text-3xl font-bold text-white bg-black/20 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/10"
      animate={{ scale: isGameStart ? [1, 1.05, 1] : 1 }}
      transition={{
        duration: 0.5,
        repeat: isGameStart ? Infinity : 0,
        repeatDelay: 1,
      }}
    >
      {formattedTime}
    </motion.div>
  );
});

Timer.displayName = 'Timer';

export default Timer;
