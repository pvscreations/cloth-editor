import { create } from "zustand";
import { EGameStage } from "../constants";
export interface IGameStageState {
  stage: EGameStage;
  setStage: (stage: EGameStage) => void;
}
export const useGameStage = create<IGameStageState>((set) => ({
  stage: EGameStage.LOADING,
  setStage: (stage) => set({ stage }),
}));
