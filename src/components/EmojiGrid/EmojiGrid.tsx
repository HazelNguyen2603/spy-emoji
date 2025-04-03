import React, { useEffect, useState } from "react";
import { listEmoji } from "../../configs";
import { motion } from "motion/react";
import { GameState } from "../../types";

interface EmojiGridProps {
  level: number;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  getResult: (result: boolean) => void;
}

const EmojiGrid = ({ level, getResult }: EmojiGridProps) => {
  const gridSize = level + 1;

  const [spyIndex, setSpyIndex] = useState<number>(0);
  const [baseEmojis, setBaseEmojis] = useState<string>("");
  const [spyEmoji, setSpyEmoji] = useState<string>("");

  const generateEmoji = () => {
    const randomBaseEmoji =
      listEmoji[Math.floor(Math.random() * listEmoji.length)];
    const restEmoji = listEmoji.filter(emoji => emoji !== randomBaseEmoji);
    const randomSpyEmoji =
      restEmoji[Math.floor(Math.random() * listEmoji.length)];
    setBaseEmojis(randomBaseEmoji);
    setSpyEmoji(randomSpyEmoji);
    setSpyIndex(Math.floor(Math.random() * gridSize * gridSize));
  };

  const handleClickEmoji = (index: number) => {
    return getResult(index === spyIndex);
  };

  useEffect(() => {
    generateEmoji();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`
        }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          return (
            <motion.div
              key={index}
              onClick={() => handleClickEmoji(index)}
              className="flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ duration: 0.5 }}
            >
              <p
                className={`${
                  gridSize > 9
                    ? "text-2xl"
                    : gridSize > 8
                    ? "text-3xl"
                    : gridSize > 7
                    ? "text-4xl"
                    : gridSize > 5
                    ? "text-5xl"
                    : "text-7xl"
                }`}
              >
                {index === spyIndex ? spyEmoji : baseEmojis}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default EmojiGrid;
