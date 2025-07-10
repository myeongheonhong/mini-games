import { memo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { GAME_MODE } from '@/types/memory';
import type { GameModeType, ImageCardType } from '@/types/memory';

interface GameModesProps {
  setGameMode: (gameMode: GameModeType) => void;
  setImageList: (imageList: ImageCardType[]) => void;
}

const GameModes = memo(({ setGameMode, setImageList }: GameModesProps) => {
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: GameModeType
  ) => {
    const files = e.target.files;

    if (!files) return;

    if (files.length !== Math.pow(GAME_MODE[key].value, 2) / 2) {
      toast.error(
        `${Math.pow(GAME_MODE[key].value, 2) / 2}장의 이미지가 필요합니다.`
      );
      return;
    }

    const temp = Array.from(files).map((file, index) => {
      return {
        key: index,
        id: index,
        image: URL.createObjectURL(file),
        name: file.name,
        isOpen: true,
      };
    });

    const temp2 = temp.map((item) => {
      return {
        ...item,
        key: item.key + temp.length,
        isOpen: true,
      };
    });

    setImageList([...temp, ...temp2].sort(() => Math.random() - 0.5));
    setGameMode(key);
  };

  return (
    <>
      {Object.entries(GAME_MODE).map(([key, value]) => (
        <motion.li
          key={key}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <label className="cursor-pointer w-full h-full flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all duration-200 border border-white/20 text-white font-semibold min-w-[100px]">
            <input
              className="hidden"
              type="file"
              name="image"
              accept="image/*"
              multiple
              onChange={(e) => handleImageChange(e, key as GameModeType)}
            />
            <motion.span
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {value.label}
            </motion.span>
          </label>
        </motion.li>
      ))}
    </>
  );
});

GameModes.displayName = 'GameModes';

export default GameModes;
