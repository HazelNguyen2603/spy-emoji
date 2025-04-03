import { useEffect, useState, useCallback, memo } from "react";
import { GameState } from "../types";
import ActionButtons from "./ActionButton/ActionButtons";
import EmojiGrid from "./EmojiGrid/EmojiGrid";
import { motion, AnimatePresence } from "motion/react";
import VideoPlayer from "./Video/VideoPlayer";

const INITIAL_TIMER = 10;
const WINNING_LEVEL = 10;
const POINTS_PER_LEVEL = 10;

const AnimateNumber = memo(({ children }: { children: number }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={children}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="font-bold"
      >
        {children}
      </motion.span>
    </AnimatePresence>
  );
});

AnimateNumber.displayName = "AnimateNumber";

const Game = () => {
  const [gameState, setGameState] = useState<GameState>("start");
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIMER);

  const gameReset = useCallback(() => {
    setLevel(1);
    setScore(0);
    setGameState("playing");
    setTimeLeft(INITIAL_TIMER);
  }, []);

  const getResult = useCallback((result: boolean) => {
    if (result) {
      setLevel(prev => prev + 1);
      setScore(prev => prev + POINTS_PER_LEVEL);
    } else {
      setGameState("lose");
    }
  }, []);

  useEffect(() => {
    if (level > WINNING_LEVEL) {
      setGameState("win");
      return;
    }

    if (gameState !== "playing") return;

    setTimeLeft(INITIAL_TIMER);
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState("lose");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [level, gameState]);

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Header */}
      <div className="flex flex-col items-center">
        <h1 className="mt-4 mb-2">Emoji Spy</h1>
        <p className="subHeading">Test your perception</p>
      </div>

      {/* Game controls */}
      <ActionButtons
        gameState={gameState}
        setGameState={setGameState}
        gameReset={gameReset}
      />

      {/* Game stats or video */}
      {gameState !== "start" ? (
        <div className="mx-auto flex gap-10 my-2">
          <p className="text-2xl font-medium">Score: {score}</p>
          <p className="text-2xl font-medium">Level: {level}</p>
        </div>
      ) : (
        <VideoPlayer />
      )}

      {/* Active gameplay */}
      {gameState === "playing" && (
        <div className="flex flex-col gap-4">
          <div
            className={`text-3xl mx-auto ${
              timeLeft <= 3 ? "text-red-500" : "text-blue-600"
            }`}
          >
            Time left: <AnimateNumber>{timeLeft}</AnimateNumber>
          </div>
          <EmojiGrid
            level={level}
            setGameState={setGameState}
            getResult={getResult}
          />
        </div>
      )}

      {/* Game end states */}
      {gameState === "lose" && (
        <div className="mx-auto text-5xl font-semibold">
          Game Over! Try Again.😭{" "}
        </div>
      )}
      {gameState === "win" && (
        <div className="mx-auto text-5xl font-semibold">
          You win! Congratulations.🎊
        </div>
      )}
    </div>
  );
};

export default Game;
