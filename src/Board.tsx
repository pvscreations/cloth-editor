import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Brush, Evaluator, SUBTRACTION } from 'three-bvh-csg';
import { useThree } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';

const boardFill = new Brush(new THREE.BoxGeometry(11, 5, 11));
const boardHole = new Brush(new THREE.BoxGeometry(10, 5.1, 10));
// Optionally adjust position of hole
// boardHole.position.y = 0.2;
// boardHole.updateMatrixWorld();

// Evaluate
const evaluator = new Evaluator();
const board = evaluator.evaluate(boardFill, boardHole, SUBTRACTION);
board.geometry.clearGroups();
board.material = new THREE.MeshStandardMaterial({ color: '#ffffff', metalness: 0, roughness: 0.3 });
board.castShadow = true;
board.receiveShadow = true;
export function Board({position, scale}: {position?: [number, number, number], scale?: number}= {position: [0,0.4,0], scale: 0.1}) {

    return (
        <primitive object={board} position={position} rotation-x={Math.PI / 2} scale={scale} />
    );
}
