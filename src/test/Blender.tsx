import {
  OrbitControls,
  useAnimations,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import Lights from "../Lights";
import { act, useLayoutEffect } from "react";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export const Blender = () => {
  const model = useGLTF("/model/cloth.glb");
  const texture = useTexture("/model/cloth_final.jpg");
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const { mixer, actions, clips } = useAnimations(
    model.animations,
    model.scene
  );
  console.log(mixer, actions, clips, model, "check");
  const camera = useThree((state) => state.camera);
  // useFrame(() => {
  //   if (model.cameras && model.cameras[0]) {
  //     camera.position.copy(model.cameras[0].position);
  //     camera.quaternion.copy(model.cameras[0].quaternion);
  //   }
  // });
  // useEffect(() => {
  //   // actions["baseAction"]?.play();
  //   mixer.clipAction(clips[0])?.play();
  //   // actions["BaseAction"]?.play();
  //   // actions[clips[0].name]?.play();
  // });

  useLayoutEffect(() => {
    if (model && model.scene && texture) {
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;
      const material = new THREE.MeshBasicMaterial({
        // map: texture,
        // color: "red",
        side: THREE.DoubleSide,
      });
      model.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      });
    }
  }, [model, texture]);

  // useEffect(() => {
  //   console.log(mixer, model, mixer.actions["testAction"]);
  // }, [model, mixer]);

  return (
    <>
      <ambientLight intensity={1.5} />
      <Lights />
      <OrbitControls />
      <primitive object={model.scene} scale={0.5} />
    </>
  );
};
