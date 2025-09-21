import { forwardRef, useLayoutEffect } from "react";
import { EAssets } from "../constants/assets";
import { useAssetsStore } from "../stores/useAssetsStore";
import * as THREE from "three";
export const ClothModel = forwardRef((_, modelRef) => {
  const items = useAssetsStore((state) => state.items);
  const model = items[EAssets.CLOTH_MODEL].loadedObject;
  const texture = items[EAssets.CLOTH_TEXTURE].loadedObject as THREE.Texture;
  useLayoutEffect(() => {
    if (model && model.scene && texture) {
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;
      const material = new THREE.MeshBasicMaterial({
        // map: texture,
        color: "red",
        side: THREE.DoubleSide,
      });
      model.scene.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      });
    }
  }, [model, texture]);
  return (
    <>
      <primitive ref={modelRef} object={model.scene} scale={0.5} />
    </>
  );
});
