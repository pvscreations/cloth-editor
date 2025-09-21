// src/experience/shared/store/assetsStore.ts
import { create } from 'zustand';
import { IAsset } from '../types/assets';

interface AssetsState {
  items: Record<string, any>;
  total: number;
  loaded: number;
  isReady: boolean;
  progress: number;
  updateAsset: (key: string, asset: IAsset[keyof IAsset] & { loadedObject: any }) => void;
  initialize: (config: IAsset) => void;
}

export const useAssetsStore = create<AssetsState>((set, get) => ({
  items: {},
  total: 0,
  loaded: 0,
    isReady: false,
  progress:0,
  updateAsset: (key, asset) => 
      set(state => {
        console.log('Updating asset:', key, asset);
      const newItems = { ...state.items };
      newItems[key] = asset;
      const newLoaded = state.loaded + 1;
      const newProgress = (newLoaded / state.total) * 100;
      return {
        items: newItems,
        loaded: newLoaded,
        isReady: newLoaded === state.total,
        progress: newProgress
      };
    }),
  initialize: (config) => 
    set({
      total: Object.keys(config).length,
      loaded: 0,
      isReady: false,
      items: Object.keys(config).reduce((acc, key) => ({
        ...acc,
        //@ts-ignore
        [key]: { ...config[key], loadedObject: null }
      }), {})
    })
}));

