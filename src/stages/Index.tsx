import { useState } from "react";
import { assetsConfig } from "../config/assetsConfig";
import { EGameStage } from "../constants";
import { useAssetsLoader } from "../loaders/useAssetsLoader";
import { Editor } from "./Editor";
import { ProgressBar } from "./ProgressBar";
import StartButton from "./StartButton";
import { useGameStage } from "../stores/useGameStage";

export const Index: React.FC = () => {
  useAssetsLoader(assetsConfig);
  const { stage, setStage } = useGameStage();
  switch (stage) {
    case EGameStage.LOADING:
      return <ProgressBar setGameState={setStage} />;
    case EGameStage.START_SCREEN:
      return <StartButton setGameState={setStage} />;
    case EGameStage.GAME_PLAY:
      return <Editor />;
    default:
      return null;
  }
};
