import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import Layout from '@/components/Layout';
import Timer from '@/components/memory/Timer';
import GameButtons from '@/components/memory/GameButtons';
import GameModes from '@/components/memory/GameModes';
import ImageGrid from '@/components/memory/ImageGrid';
import type { GameModeType, ImageCardType } from '@/types/memory';

const Memory = () => {
  const [gameMode, setGameMode] = useState<GameModeType>('easy');
  const [imageList, setImageList] = useState<ImageCardType[]>([]);
  const [isGameStart, setIsGameStart] = useState(false);
  const [isCorrect, setIsCorrect] = useState(0);
  const [correctCards, setCorrectCards] = useState<number[]>([]);
  const [timerKey, setTimerKey] = useState(0); // 타이머 리셋을 위한 key

  const handleGameStart = () => {
    setIsGameStart(!isGameStart);
    if (!isGameStart) {
      // 게임 시작할 때만 카드들을 뒤집기
      setImageList([...imageList.map((item) => ({ ...item, isOpen: false }))]);
    }
  };

  const handleRestart = () => {
    // 이미지 배열을 랜덤으로 재정렬하고 게임 재시작
    const shuffledImages = [...imageList].sort(() => Math.random() - 0.5);
    setImageList(shuffledImages.map((item) => ({ ...item, isOpen: false })));
    setIsGameStart(true);
    setIsCorrect(0);
    setCorrectCards([]); // 정답 카드들 초기화
    setTimerKey((prev) => prev + 1); // 타이머 리셋
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-8">
          Memory Game
        </h1>
      </motion.div>

      <motion.ul
        className="flex gap-4 mt-4 justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <GameModes setGameMode={setGameMode} setImageList={setImageList} />
      </motion.ul>

      <motion.section
        className="mt-8 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex justify-center items-center">
          <ImageGrid
            isGameStart={isGameStart}
            imageList={imageList}
            setImageList={setImageList}
            gameMode={gameMode}
            setIsGameStart={setIsGameStart}
            isCorrect={isCorrect}
            setIsCorrect={setIsCorrect}
            correctCards={correctCards}
            setCorrectCards={setCorrectCards}
          />
        </div>
      </motion.section>

      <AnimatePresence>
        {imageList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-10 flex flex-col items-center gap-6"
          >
            <Timer isGameStart={isGameStart} key={timerKey} />
            <GameButtons
              isGameStart={isGameStart}
              handleGameStart={handleGameStart}
              handleRestart={handleRestart}
              isGameComplete={isCorrect === imageList.length}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster duration={1000} />
    </Layout>
  );
};

export default Memory;
