export type ImageCardType = {
  key: number;
  id: number;
  image: string;
  isOpen: boolean;
  name: string;
};

export const GAME_MODE = {
  easy: {
    value: 4,
    label: 'Easy',
  },
  medium: {
    value: 6,
    label: 'Medium',
  },
} as const;

export type GameModeType = keyof typeof GAME_MODE;
