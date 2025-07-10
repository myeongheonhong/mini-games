import { memo } from 'react';
import { motion } from 'framer-motion';

interface GameButtonsProps {
  isGameStart: boolean;
  handleGameStart: () => void;
  handleRestart: () => void;
  isGameComplete: boolean;
}

const GameButtons = memo(
  ({
    isGameStart,
    handleGameStart,
    handleRestart,
    isGameComplete,
  }: GameButtonsProps) => {
    return (
      <motion.div
        className="flex justify-center items-center gap-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.button
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-200 border border-white/20"
          onClick={handleGameStart}
          whileHover={{
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
            y: -2,
          }}
          whileTap={{ scale: 0.98 }}
        >
          {isGameStart ? '게임 종료' : '게임 시작'}
        </motion.button>

        {isGameComplete && (
          <motion.button
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-200 border border-white/20"
            onClick={handleRestart}
            whileHover={{
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
              y: -2,
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            다시하기
          </motion.button>
        )}
      </motion.div>
    );
  }
);

GameButtons.displayName = 'GameButtons';

export default GameButtons;
