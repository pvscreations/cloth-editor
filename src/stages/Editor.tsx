import {
  Line,
  OrbitControls,
  Point,
  PointMaterial,
  Points,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { useLayoutEffect, useRef, useState } from "react";
import { PostProcessingEffects } from "../effects/PostProcessingEffects";
import { Blender } from "../test/Blender";
import * as THREE from "three";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useAssetsStore } from "../stores/useAssetsStore";
import { EAssets } from "../constants/assets";
import { ClothModel } from "../components/ClothMode";
import "../geometry/fatlinTypes";
import { LineGeometry } from "three-fatline";
export const Editor = () => {
  const modelRef = useRef<THREE.Scene>(null);
  //load model and mapping texture

  //looking at camera
  useFrame((state) => {
    if (modelRef.current) {
      //   modelRef.current.lookAt(state.camera.position);
    }
    // state.camera.position.set(0, 2, 5);
    // state.camera.lookAt(0, 0, 0);
  });

  const [points, setPoints] = useState<THREE.Vector3[]>([
    new THREE.Vector3(0, 0, 0.5),
    new THREE.Vector3(0.5, 0, 0),
  ]);

  const [lines, setLines] = useState<THREE.Vector3[]>([]);
  const [polygon, setPolygon] = useState<THREE.Vector3[]>([]);

  const pointerUpHandler = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const newPoint = new THREE.Vector3(
      e.intersections[0].point.x,
      e.intersections[0].point.y,
      e.intersections[0].point.z + 1e-10
    );
    setPoints((prevPoints) => [...prevPoints, newPoint]);
  };
  return (
    <>
      {/* <PostProcessingEffects /> */}
      {/* <Blender /> */}
      {/* <fatLine>
        <fatLineGeometry attach="geometry" points={points} />
        <fatLineMaterial color={"red"} linewidth={0.01} />
      </fatLine> */}

      {/* <fatLine ref={fatLineRef}>
        <fatLineMaterial color={"red"} linewidth={0.01} />
      </fatLine> */}
      <Line points={points} color="black" lineWidth={1} />

      <Points>
        {points.map((point, index) => (
          <Point key={index} position={point} />
        ))}
        <PointMaterial
          color={"black"}
          size={0.1}
          sizeAttenuation={true}
          // colorWrite={false}
          transparent={true}
          depthWrite={false}
        />
      </Points>
      {/* <OrbitControls /> */}
      <group onPointerUp={pointerUpHandler}>
        <ClothModel ref={modelRef} />
      </group>
    </>
  );
};
