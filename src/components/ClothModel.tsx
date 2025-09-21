import { forwardRef, useLayoutEffect } from "react";
import { MeshBVH, acceleratedRaycast } from "three-mesh-bvh";
import { EAssets } from "../constants/assets";
import { useAssetsStore } from "../stores/useAssetsStore";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { modelConfig } from "../config/levaConfig";
export const ClothModel = forwardRef((_, modelRef) => {
  const items = useAssetsStore((state) => state.items);
  const model = items[EAssets.CLOTH_MODEL].loadedObject;
  const texture = items[EAssets.CLOTH_TEXTURE].loadedObject as THREE.Texture;
  const camera = useThree((state) => state.camera);
  const modelProps = useControls("Cloth Model", modelConfig);
  useLayoutEffect(() => {
    if (model && model.scene && texture) {
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;
      const material = new THREE.MeshStandardMaterial({
        // map: texture,
        color: modelProps.modelColor,
        side: THREE.DoubleSide,
      });
      model.scene.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
          // Apply BVH only to this mesh
          child.raycast = acceleratedRaycast;
          if (!child.geometry.boundsTree) {
            child.geometry.boundsTree = new MeshBVH(child.geometry);
          }
        }
      });
      //making model to orient to camera
      (model.scene as THREE.Scene).lookAt(camera.position);
    }
  }, [model, texture, modelProps.modelColor]);
  return (
    <>
      <primitive ref={modelRef} object={model.scene} scale={0.5} />
    </>
  );
});
