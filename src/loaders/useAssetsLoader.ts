// src/experience/shared/hooks/useAssetsLoader.ts
import { useEffect, useMemo } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { IAsset } from '../types/assets';
import { useAssetsStore } from '../stores/useAssetsStore';
import { EAssetsType } from '../constants/assets';


export function useAssetsLoader(assetsConfig: IAsset) {
  const { updateAsset, initialize } = useAssetsStore();

  // Initialize store with config
  useEffect(() => {
    initialize(assetsConfig);
  }, [assetsConfig]);

  // Categorize assets by type
  const { textureAssets, gltfAssets } = useMemo(() => {
    const textures: { path: string; key: string }[] = [];
    const gltfs: { path: string; key: string }[] = [];

    Object.entries(assetsConfig).forEach(([key, asset]) => {
      //@ts-ignore
      if (asset.type === EAssetsType.TEXTURE) {
        //@ts-ignore
        textures.push({ path: asset.path, key });
        //@ts-ignore
      } else if (asset.type === EAssetsType.GLB) {
        //@ts-ignore
        gltfs.push({ path: asset.path, key });
      }
    });

    return {
      textureAssets: textures,
      gltfAssets: gltfs
    };
  }, [assetsConfig]);

  // Load textures
  const textures = useTexture(textureAssets.map(t => t.path));
  useEffect(() => {
    if (textures) {
      textureAssets.forEach((asset, index) => {
        const texture = Array.isArray(textures) ? textures[index] : textures;
        updateAsset(asset.key, {
          //@ts-ignore
          ...assetsConfig[asset.key],
          loadedObject: texture
        });
      });
    }
  }, [textures]);

  // Load GLTF models
  const models = useGLTF(gltfAssets.map(m => m.path));
  useEffect(() => {
    if (models) {
      gltfAssets.forEach((asset, index) => {
        const model = Array.isArray(models) ? models[index] : models;
        updateAsset(asset.key, {
          //@ts-ignore
          ...assetsConfig[asset.key],
          loadedObject: model
        });
      });
    }
  }, [models]);
}

