import { EAssets, EAssetsType } from "../constants/assets";

export interface IAsset extends Partial<Record<EAssets, unknown>> {}

export interface IAssetConfig {
  name: EAssets;
  type: EAssetsType;
  path: string;
}
