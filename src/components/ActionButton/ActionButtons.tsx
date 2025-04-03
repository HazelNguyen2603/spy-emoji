import { useState } from "react";
import { GameState } from "../../types";
import Button from "../commons/Button";
import Dialog from "../commons/Dialog";
import { IoHomeOutline } from "react-icons/io5";
import { VscDebugStart } from "react-icons/vsc";
import { FaArrowRight } from "react-icons/fa6";
import { IoMdHelp } from "react-icons/io";

interface ActionButtonsProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  gameReset: () => void;
}

const ActionButtons = ({
  gameState,
  setGameState,
  gameReset
}: ActionButtonsProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="mx-auto">
      <div className="flex items-center gap-5">
        {gameState === "start" ? (
          <Button
            severity="primary"
            label="Start game"
            postIcon={<VscDebugStart />}
            onClick={() => setGameState("playing")}
          ></Button>
        ) : gameState === "playing" ? (
          <Button
            severity="primary"
            label="Home"
            onClick={() => setGameState("start")}
            preIcon={<IoHomeOutline />}
          ></Button>
        ) : (
          <Button
            severity="primary"
            label="Try again"
            postIcon={<FaArrowRight />}
            onClick={() => gameReset()}
          ></Button>
        )}
        <Button
          severity="secondary"
          label="Help"
          preIcon={<IoMdHelp />}
          onClick={() => setOpenDialog(true)}
        ></Button>
      </div>
      <Dialog
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Game instruction"
      >
        <p>
          Find the emoji that is different from the others. Click on it before
          time up to win the game. If you click on the wrong emoji, you will
          lose the game.
        </p>
      </Dialog>
    </div>
  );
};
export default ActionButtons;
