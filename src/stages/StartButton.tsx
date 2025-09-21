//@ts-ignore
import { ThreeEvent } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { Sprite,  Texture } from "three";
import PulseEffect from "../features/PulseEffect";
import FadeOutEffect from "../features/FadeOutEffect";
import { EAssets } from "../constants/assets";
import { EGameStage } from "../constants";
import { useAssetsStore } from "../stores/useAssetsStore";
import * as THREE from 'three';
import { IGameStageState } from "../stores/useGameStage";

export default function StartButton({
  setGameState,
}: {
  setGameState: IGameStageState["setStage"];
}) {
  const items = useAssetsStore((state) => state.items);
  const playButtonRef = useRef<Sprite>(null!);
  const [isPlayButtonClicked, setIsPlayButtonClicked] = useState(false);
  const playButtonClick = (event: ThreeEvent<MouseEvent>) => {
    //initialise Analtics instance
    setIsPlayButtonClicked(true);
    event.stopPropagation();
  };

  const playButtonTexture = useMemo(() => {
    const texture = items[EAssets.PLAY_BUTTON].loadedObject as Texture;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, [items]);
  return (
    <PulseEffect y scaleY={1.1} transitionTime={0.5}>
      <FadeOutEffect
        isActive={isPlayButtonClicked}
        duration={0.5}
        onComplete={() => {
          setGameState(EGameStage.GAME_PLAY);
        }}
      >
        <ambientLight/>
        <sprite
          onClick={(event) => {
            playButtonClick(event);
          }}
          ref={playButtonRef}
          scale={2}
        >
          <spriteMaterial
            map={playButtonTexture}
          />
        </sprite>
      </FadeOutEffect>
    </PulseEffect>
  );
}
