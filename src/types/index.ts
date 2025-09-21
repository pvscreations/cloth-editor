import { ReactNode } from 'react';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { RootState } from '@react-three/fiber';
import { EGameStates } from '../constants';

export interface PlayerProps {
  children?: ReactNode;
}

export interface InterfaceProps {
  children?: ReactNode;
}

export interface ExperienceProps {
  children?: ReactNode;
}

export interface LightsProps {
  children?: ReactNode;
}

export interface LevelProps {
  count?: number;
  children?: ReactNode;
}

export interface GameStore {
  blocksCount: number;
  blocksSeed: number;
  startTime: number | null;
  endTime: number | null;
  phase: EGameStates;
  start: () => void;
  restart: () => void;
  end: () => void;
}

export interface BlockProps {
  position?: [number, number, number];
}

export type MeshWithRigidBody = THREE.Mesh & {
  api?: {
    position: {
      set: (x: number, y: number, z: number) => void;
    };
    velocity: {
      set: (x: number, y: number, z: number) => void;
    };
    angularVelocity: {
      set: (x: number, y: number, z: number) => void;
    };
  };
};
