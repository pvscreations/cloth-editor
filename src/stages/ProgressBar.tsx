import { useLayoutEffect, useMemo } from "react";
import { useControls } from "leva";
import { Mask, Text, useMask } from "@react-three/drei";
import { Color } from "three";
import useDelayController from "../controllers/useDelayController";
import { EGameStage } from "../constants";
import { RoundedPlaneGeometry } from "../geometry/roundedGeometry";
import { useAssetsStore } from "../stores/useAssetsStore";
import { IGameStageState } from "../stores/useGameStage";
export const ProgressBar = ({
  setGameState,
}: {
  setGameState: IGameStageState["setStage"];
}) => {
  const progress = useAssetsStore((state) => state.progress);
  const { delay } = useDelayController();
  // Leva Controls - Adjustable Props
  const { width, height, radius } = useControls({
    width: { value: 6, min: 2, max: 10, step: 0.5 },
    height: { value: 0.25, min: 0.1, max: 1, step: 0.05 },
    radius: { value: 0.138, min: 0, max: 0.5, step: 0.01 },
  });

  useLayoutEffect(() => {
    if (progress === 100) {
      delay(() => {
        setGameState(EGameStage.START_SCREEN);
      }, 0.5);
    }
  }, [progress]);
  const roundedGeometry = useMemo(() => {
    return new RoundedPlaneGeometry(width, height, radius);
  }, [radius, width, height]);
  const stencil = useMask(1, false);

  return (
    <group>
      {/* Progress Text */}
      <Text
        font={
          "/comic-sans-ms-bold.ttf"
        }
        color={new Color(100 / 255, 104 / 255, 113 / 255).convertSRGBToLinear()}
        fontSize={0.3}
        textAlign="center"
        position-y={0.5}
      >
        {Math.ceil(progress) + "%"}
      </Text>

      {/* Background Bar */}
      <mesh geometry={roundedGeometry}>
        <meshBasicMaterial />
      </mesh>
      <Mask id={1} geometry={roundedGeometry}></Mask>

      {/* Foreground (Progress) Bar */}
      <group
        // scale-x={progress / 100}
        position-x={(width * progress) / 100}
      >
        <mesh position-x={-width} geometry={roundedGeometry}>
          <meshBasicMaterial
            color={new Color(
              40 / 255,
              142 / 255,
              148 / 255,
            ).convertSRGBToLinear()}
            {...stencil}
          />
        </mesh>
      </group>
    </group>
  );
};
