import { useRapier, RigidBody, RapierRigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { useState, useEffect, useRef, FC, Ref } from 'react'
import { useControls } from 'leva'
import { levelConfig, playerConfig } from './config/levaConfig'
import * as THREE from 'three'
import useGame from './stores/useGame'
import { PlayerProps } from './types'
import { EGameStates } from './constants'

const Player: FC<PlayerProps> = () => {
    const body = useRef<RapierRigidBody>(null)
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const { rapier, world } = useRapier()
    const [smoothedCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10))
    const [smoothedCameraTarget] = useState(() => new THREE.Vector3())
    const start = useGame((state) => state.start)
    const end = useGame((state) => state.end)
    const restart = useGame((state) => state.restart)
    const blocksCount = useGame((state) => state.blocksCount)

    // Leva controls
    const { impulseStrength, torqueStrength, jumpStrength, cameraOffsetZ, cameraOffsetY, restitution, friction, linearDamping, angularDamping, position } = useControls('Player', playerConfig)

    const jump = () => {
        if(!body.current)
            return
        const origin = body.current.translation()
        origin.y -= 0.31
        const direction = { x: 0, y: - 1, z: 0 }
        const ray = new rapier.Ray(origin, direction)
        const hit = world.castRay(ray, 10, true)

        if(hit && hit.timeOfImpact < 0.15) {
            body.current.applyImpulse({ x: 0, y: jumpStrength, z: 0 },true)
        }
    }
    
    const reset = () => {
        if(!body.current)
            return
        body.current.setTranslation({ x: 0, y: 1, z: 0 },true)
        body.current.setLinvel({ x: 0, y: 0, z: 0 },true)
        body.current.setAngvel({ x: 0, y: 0, z: 0 },true)
    }

    useEffect(() => {
        const unsubscribeReset = useGame.subscribe(
            (state) => state.phase,
            (value) => {
                if(value === EGameStates.READY)
                    reset()
            }
        )

        const unsubscribeJump = subscribeKeys(
            (state) => state.jump,
            (value) => {
                if(value)
                    jump()
            }
        )

        const unsubscribeAny = subscribeKeys(
            () => {
                start()
            }
        )

        return () => {
            unsubscribeReset()
            unsubscribeJump()
            unsubscribeAny()
        }
    }, [])

    useFrame((state, delta) => {
        if(!body.current)
            return
        /**
         * Controls
         */
        const { forward, backward, leftward, rightward } = getKeys()

        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

    // Use Leva values
    const impulseStrengthVal = impulseStrength * delta
    const torqueStrengthVal = torqueStrength * delta

        if(forward) {
            impulse.z -= impulseStrengthVal
            torque.x -= torqueStrengthVal
        }
        if(rightward) {
            impulse.x += impulseStrengthVal
            torque.z -= torqueStrengthVal
        }
        if(backward) {
            impulse.z += impulseStrengthVal
            torque.x += torqueStrengthVal
        }
        if(leftward) {
            impulse.x -= impulseStrengthVal
            torque.z += torqueStrengthVal
        }

        body.current.applyImpulse(impulse,true)
        body.current.applyTorqueImpulse(torque,true)

        /**
         * Camera
         */
        const bodyPosition = body.current.translation()
    
        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(bodyPosition)
    cameraPosition.z += cameraOffsetZ
    cameraPosition.y += cameraOffsetY

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(bodyPosition)
        cameraTarget.y += 0.25

        smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta)

        state.camera.position.copy(smoothedCameraPosition)
        state.camera.lookAt(smoothedCameraTarget)

        /**
        * Phases
        */
        if(bodyPosition.z < - (blocksCount * 4 + 4.3))
            end()

        if(bodyPosition.y < - 4)
            restart()
    })

    return <RigidBody
    ref={ body }
    canSleep={ false }
    colliders="ball"
    restitution={ restitution }
    friction={ friction }
    linearDamping={ linearDamping }
    angularDamping={ angularDamping }
    position={ [position.x, position.y, position.z] }
    >
        <mesh castShadow>
            <icosahedronGeometry args={ [ 0.3, 1 ] } />
            <meshStandardMaterial flatShading color="mediumpurple" />
        </mesh>
    </RigidBody>
}

export default Player;
