import { EAssets, EAssetsType } from "../constants/assets";
import { IAsset } from "../types/assets";

export const assetsConfig: IAsset = {
  [EAssets.CLOTH_MODEL]: {
    name: EAssets.CLOTH_MODEL,
    type: EAssetsType.GLB,
    path: "/model/cloth.glb",
  },
  [EAssets.CLOTH_TEXTURE]: {
    name: EAssets.CLOTH_TEXTURE,
    type: EAssetsType.TEXTURE,
    path: "/model/cloth_final.jpg",
  },
};
