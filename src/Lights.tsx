import { useRef, FC } from 'react'
import { useControls } from 'leva'
import { lightsConfig } from './config/levaConfig'
import { useFrame } from '@react-three/fiber'
import { DirectionalLight } from 'three'
import { LightsProps } from './types'

const Lights: FC<LightsProps> = () => {
    const light = useRef<DirectionalLight>(null)
    const { directionalIntensity, ambientIntensity, directionalPositionX, directionalPositionY, directionalPositionZ } = useControls('Lights', lightsConfig)

    useFrame((state) => {
        if (light.current) {
            light.current.position.z = state.camera.position.z + directionalPositionZ - 4
            light.current.position.x = directionalPositionX
            light.current.position.y = directionalPositionY
            light.current.target.position.z = state.camera.position.z - 4
            light.current.target.updateMatrixWorld()
        }
    })

    return <>
        <directionalLight
            ref={ light }
            castShadow
            position={ [ directionalPositionX, directionalPositionY, directionalPositionZ ] }
            intensity={ directionalIntensity }
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 10 }
            shadow-camera-top={ 10 }
            shadow-camera-right={ 10 }
            shadow-camera-bottom={ - 10 }
            shadow-camera-left={ - 10 }
        />
        <ambientLight intensity={ ambientIntensity } />
    </>
}

export default Lights;
