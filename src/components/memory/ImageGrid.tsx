import { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { GAME_MODE } from '@/types/memory';
import type { GameModeType, ImageCardType } from '@/types/memory';

interface ImageGridProps {
  imageList: ImageCardType[];
  setImageList: (imageList: ImageCardType[]) => void;
  gameMode: GameModeType;
  isGameStart: boolean;
  setIsGameStart: (isGameStart: boolean) => void;
  isCorrect: number;
  setIsCorrect: React.Dispatch<React.SetStateAction<number>>;
  correctCards: number[];
  setCorrectCards: React.Dispatch<React.SetStateAction<number[]>>;
}

const ImageGrid = memo(
  ({
    imageList,
    setImageList,
    gameMode,
    isGameStart,
    setIsGameStart,
    isCorrect,
    setIsCorrect,
    correctCards,
    setCorrectCards,
  }: ImageGridProps) => {
    const [pair, setPair] = useState<ImageCardType[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (isCorrect === imageList.length) {
        toast.success('게임 종료!');
        setIsGameStart(false);
      }
    }, [isCorrect, imageList, setIsGameStart]);

    useEffect(() => {
      if (pair.length === 2) {
        setLoading(true);
        if (pair[0].id === pair[1].id) {
          toast.success('정답입니다!');
          setIsCorrect((prev: number) => prev + 2);
          setCorrectCards((prev) => [...prev, pair[0].key, pair[1].key]);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        } else {
          setTimeout(() => {
            setImageList(
              imageList.map((item) => {
                if (item.key === pair[0].key || item.key === pair[1].key) {
                  return { ...item, isOpen: false };
                }
                return item;
              })
            );
            setLoading(false);
          }, 800);
        }
        setPair([]);
      }
    }, [pair, imageList, setImageList, setIsCorrect, setCorrectCards]);

    const handleImageClick = (image: ImageCardType) => {
      if (!isGameStart) return;
      if (image.isOpen) return;
      if (loading) return;

      if (pair.length < 2) {
        setPair([...pair, image]);
        setImageList(
          imageList.map((item) => {
            if (item.key === image.key) {
              return { ...item, isOpen: true };
            }
            return item;
          })
        );
      }
    };

    const gridStyle = `grid ${
      GAME_MODE[gameMode].value === 4 ? 'grid-cols-4' : 'grid-cols-6'
    } gap-4 w-full h-full max-w-3xl max-h-3xl`;

    return (
      <motion.ul
        className={gridStyle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, staggerChildren: 0.1 }}
      >
        {imageList.map((image, index) => (
          <motion.li
            key={image.key}
            className="aspect-square cursor-pointer"
            onClick={() => handleImageClick(image)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-full h-full relative"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="relative w-full h-full"
                animate={{ rotateY: image.isOpen ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* 카드 뒷면 */}
                <motion.div
                  className="absolute inset-0 w-full h-full backface-hidden rounded-xl"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div
                    className={`w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-xl shadow-lg flex items-center justify-center border-3 ${
                      correctCards.includes(image.key)
                        ? 'border-green-500'
                        : 'border-white/20'
                    }`}
                  >
                    <motion.div
                      className="w-8 h-8 bg-white/30 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </div>
                </motion.div>

                {/* 카드 앞면 */}
                <motion.div
                  className="absolute inset-0 w-full h-full backface-hidden rounded-xl"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div
                    className={`w-full h-full bg-white rounded-xl shadow-lg overflow-hidden border-3 ${
                      correctCards.includes(image.key)
                        ? 'border-green-500'
                        : 'border-white/30'
                    }`}
                  >
                    <img
                      src={image.image}
                      alt={image.id.toString()}
                      className="w-full h-full object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-white text-sm font-bold absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        {image.name
                          .split(' ')[0]
                          .replace(/\.(jpeg|jpg|png|gif|webp)$/i, '')}
                        <br />
                        {image.name
                          .split(' ')[1]
                          ?.replace(/\.(jpeg|jpg|png|gif|webp)$/i, '') || ''}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.li>
        ))}
      </motion.ul>
    );
  }
);

ImageGrid.displayName = 'ImageGrid';

export default ImageGrid;
